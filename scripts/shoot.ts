#!/usr/bin/env bun
/**
 * Screenshot pipeline — captures any route at 3 viewports.
 * Usage: bun run shoot <route>
 * Example: bun run shoot /
 *
 * Env knobs:
 *   SHOOT_BASE        base URL (default: http://localhost:3000)
 *   SHOOT_FULL        capture full-page scroll (default: true)
 *   SHOOT_SCALE       device pixel ratio (default: 2)
 *   SHOOT_CHROME      path to Chrome/Chromium binary
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

const BASE       = process.env.SHOOT_BASE ?? "http://localhost:3000";
const FULL_PAGE  = process.env.SHOOT_FULL !== "false";
const SCALE      = Number(process.env.SHOOT_SCALE ?? 2);
const route      = process.argv[2] ?? "/";

const VIEWPORTS = [
  { name: "mobile",  width: 375,  height: 812  },
  { name: "tablet",  width: 768,  height: 1024 },
  { name: "desktop", width: 1440, height: 900  },
] as const;

async function shoot(route: string) {
  const slug    = route.replace(/\//g, "_").replace(/^_/, "") || "home";
  const outDir  = join(process.cwd(), ".screenshots", slug);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    ...(process.env.SHOOT_CHROME ? { executablePath: process.env.SHOOT_CHROME } : {}),
  });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport:          { width: vp.width, height: vp.height },
      deviceScaleFactor: SCALE,
      reducedMotion:     "reduce",  // deterministic captures
    });

    const page   = await context.newPage();
    const url    = `${BASE}${route}`;
    await page.goto(url, { waitUntil: "networkidle" });

    const file = join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: FULL_PAGE });
    console.log(`  ✓  ${vp.name} → ${file}`);

    await context.close();
  }

  await browser.close();
  console.log(`\nDone: .screenshots/${slug}/`);
}

await shoot(route);
