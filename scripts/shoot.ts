#!/usr/bin/env bun
/**
 * Screenshot pipeline.
 *
 * Captures a route at mobile / tablet / desktop viewports using a headless
 * Chromium driven directly via the Chrome DevTools Protocol over WebSocket.
 * Reduced-motion is forced so captures are deterministic.
 *
 * Usage:
 *   bun run shoot <route>
 *
 * Env knobs:
 *   SHOOT_BASE          base URL (default http://localhost:3000)
 *   SHOOT_FULL          also capture full-page framings (default 1)
 *   SHOOT_WIDE          also capture a 1920 ultrawide viewport (default 0)
 *   SHOOT_SCALE         device pixel ratio (default 1)
 *   SHOOT_FULL_HEIGHT   max height for full-page captures (default 8000)
 *   SHOOT_CHROME        chromium executable path (default: playwright bundle)
 */

import { spawn, type ChildProcess } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { setTimeout as delay } from "node:timers/promises";
import { chromium } from "playwright";

interface Viewport {
  name: string;
  width: number;
  height: number;
}

interface CdpResponse<T = unknown> {
  id?: number;
  result?: T;
  error?: { code: number; message: string };
  method?: string;
  params?: unknown;
  sessionId?: string;
}

interface PendingCall {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
}

class Cdp {
  private ws: WebSocket;
  private nextId = 1;
  private pending = new Map<number, PendingCall>();

  private constructor(ws: WebSocket) {
    this.ws = ws;
  }

  static async connect(url: string): Promise<Cdp> {
    const ws = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      ws.addEventListener("open", () => resolve(), { once: true });
      ws.addEventListener("error", () => reject(new Error("CDP WebSocket failed to open")), { once: true });
    });
    const cdp = new Cdp(ws);
    ws.addEventListener("message", (event) => cdp.onMessage(String(event.data)));
    return cdp;
  }

  send<T = unknown>(method: string, params: Record<string, unknown> = {}, sessionId?: string): Promise<T> {
    const id = this.nextId++;
    const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, {
        resolve: (value) => resolve(value as T),
        reject,
      });
      this.ws.send(JSON.stringify(payload));
    });
  }

  private onMessage(raw: string): void {
    const msg = JSON.parse(raw) as CdpResponse;
    if (msg.id !== undefined) {
      const pending = this.pending.get(msg.id);
      if (!pending) return;
      this.pending.delete(msg.id);
      if (msg.error) {
        pending.reject(new Error(`${msg.error.code}: ${msg.error.message}`));
      } else {
        pending.resolve(msg.result);
      }
    }
  }

  close(): void {
    this.ws.close();
  }
}

const route = process.argv[2];
if (!route) {
  console.error("Usage: bun run shoot <route>");
  process.exit(1);
}

const env = {
  base: process.env.SHOOT_BASE ?? "http://localhost:3000",
  full: parseBool(process.env.SHOOT_FULL, true),
  wide: parseBool(process.env.SHOOT_WIDE, false),
  scale: Number(process.env.SHOOT_SCALE ?? "1"),
  fullHeight: Number(process.env.SHOOT_FULL_HEIGHT ?? "8000"),
  chrome: process.env.SHOOT_CHROME ?? chromium.executablePath(),
};

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value !== "0" && value.toLowerCase() !== "false";
}

const viewports: Viewport[] = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];
if (env.wide) {
  viewports.push({ name: "wide", width: 1920, height: 1080 });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

async function main(): Promise<void> {
  const slug = slugify(route);
  const outDir = join(".screenshots", slug);
  mkdirSync(outDir, { recursive: true });

  const userDataDir = mkdtempSync(join(tmpdir(), "shoot-"));
  const proc = launchChrome(userDataDir);

  try {
    const port = await waitForPort(userDataDir);
    const wsUrl = await fetchBrowserWsUrl(port);
    const cdp = await Cdp.connect(wsUrl);

    try {
      for (const viewport of viewports) {
        await captureViewport(cdp, viewport, slug, outDir);
      }
    } finally {
      cdp.close();
    }
  } finally {
    proc.kill();
    rmSync(userDataDir, { recursive: true, force: true });
  }
}

function launchChrome(userDataDir: string): ChildProcess {
  const args = [
    "--headless=new",
    "--remote-debugging-port=0",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    `--user-data-dir=${userDataDir}`,
    "--hide-scrollbars",
    "--mute-audio",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--force-prefers-reduced-motion",
    "about:blank",
  ];
  return spawn(env.chrome, args, { stdio: ["ignore", "pipe", "pipe"] });
}

async function waitForPort(userDataDir: string): Promise<number> {
  const portFile = join(userDataDir, "DevToolsActivePort");
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (existsSync(portFile)) {
      const contents = readFileSync(portFile, "utf8").trim();
      const firstLine = contents.split("\n")[0];
      const port = Number(firstLine);
      if (Number.isFinite(port) && port > 0) return port;
    }
    await delay(50);
  }
  throw new Error("Timed out waiting for chrome remote debugging port");
}

async function fetchBrowserWsUrl(port: number): Promise<string> {
  const res = await fetch(`http://127.0.0.1:${port}/json/version`);
  const body = (await res.json()) as { webSocketDebuggerUrl: string };
  return body.webSocketDebuggerUrl;
}

async function captureViewport(cdp: Cdp, viewport: Viewport, slug: string, outDir: string): Promise<void> {
  const target = await cdp.send<{ targetId: string }>("Target.createTarget", { url: "about:blank" });
  const session = await cdp.send<{ sessionId: string }>("Target.attachToTarget", {
    targetId: target.targetId,
    flatten: true,
  });
  const sessionId = session.sessionId;

  try {
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: env.scale,
        mobile: viewport.name === "mobile",
      },
      sessionId
    );
    await cdp.send(
      "Emulation.setEmulatedMedia",
      { features: [{ name: "prefers-reduced-motion", value: "reduce" }] },
      sessionId
    );

    const targetUrl = new URL(route, env.base).toString();
    console.log(`[shoot] ${viewport.name} ${viewport.width}x${viewport.height} → ${targetUrl}`);

    await navigateAndWait(cdp, sessionId, targetUrl);

    await captureFraming(cdp, sessionId, viewport, "viewport", outDir, slug);

    if (env.full) {
      await captureFraming(cdp, sessionId, viewport, "full", outDir, slug);
    }
  } finally {
    await cdp.send("Target.closeTarget", { targetId: target.targetId }).catch(() => {
      /* swallow */
    });
  }
}

async function navigateAndWait(cdp: Cdp, sessionId: string, url: string): Promise<void> {
  await cdp.send("Page.navigate", { url }, sessionId);
  // Give the page a moment to render after networkidle. Reduced-motion is on,
  // so animations should not cause flake.
  await delay(800);
}

async function captureFraming(
  cdp: Cdp,
  sessionId: string,
  viewport: Viewport,
  framing: "viewport" | "full",
  outDir: string,
  slug: string
): Promise<void> {
  if (framing === "full") {
    const metrics = await cdp.send<{ contentSize: { width: number; height: number } }>(
      "Page.getLayoutMetrics",
      {},
      sessionId
    );
    const fullHeight = Math.min(Math.ceil(metrics.contentSize.height), env.fullHeight);
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: viewport.width,
        height: fullHeight,
        deviceScaleFactor: env.scale,
        mobile: viewport.name === "mobile",
      },
      sessionId
    );
    await delay(200);
  }

  const screenshot = await cdp.send<{ data: string }>(
    "Page.captureScreenshot",
    { format: "png", captureBeyondViewport: false, fromSurface: true },
    sessionId
  );

  const buffer = Buffer.from(screenshot.data, "base64");
  const filename = join(outDir, `${viewport.name}-${framing}.png`);
  writeFileSync(filename, buffer);
  console.log(`[shoot] wrote ${filename}`);

  if (framing === "full") {
    // Reset to original viewport so subsequent captures start from a known state.
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: env.scale,
        mobile: viewport.name === "mobile",
      },
      sessionId
    );
  }
  // slug is part of outDir, kept as a parameter so the call site reads cleanly.
  void slug;
}

function slugify(path: string): string {
  const trimmed = path.replace(/^\//, "").replace(/\/$/, "");
  if (!trimmed) return "index";
  return trimmed.replace(/[^a-zA-Z0-9_-]/g, "_");
}
