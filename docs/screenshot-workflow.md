# Screenshot Workflow

Deterministic visual review without a UI test runner.

## Why

The project has no Vitest / Jest / Playwright Test. Visual review is the
quality bar for UI changes, and these screenshots are how we make that review
reproducible.

## Run

```sh
bun run dev                    # in one terminal
bun run shoot /                # in another
bun run shoot /about
```

Output:

```
.screenshots/<slug>/mobile-viewport.png
.screenshots/<slug>/mobile-full.png
.screenshots/<slug>/tablet-viewport.png
.screenshots/<slug>/tablet-full.png
.screenshots/<slug>/desktop-viewport.png
.screenshots/<slug>/desktop-full.png
```

`.screenshots/` is gitignored.

## How it works

`scripts/shoot.ts` launches the Playwright-bundled Chromium with
`--remote-debugging-port=0`, reads the assigned port from the `DevToolsActivePort` file in the temp user-data-dir, opens a CDP WebSocket against `/json/version`'s `webSocketDebuggerUrl`, and drives capture entirely by hand:

1. `Target.createTarget` per viewport
2. `Target.attachToTarget` (flatten=true) → session id
3. `Emulation.setDeviceMetricsOverride` → viewport size + scale
4. `Emulation.setEmulatedMedia` → `prefers-reduced-motion: reduce` (also the launch flag `--force-prefers-reduced-motion`)
5. `Page.navigate` → 800ms settle
6. `Page.captureScreenshot` for the viewport framing
7. For full-page framings: `Page.getLayoutMetrics`, resize to content height (capped by `SHOOT_FULL_HEIGHT`), capture again

No Playwright API surface is used at runtime — only the bundled Chromium binary path (`chromium.executablePath()`).

## Env knobs

| Var | Default | Effect |
|---|---|---|
| `SHOOT_BASE` | `http://localhost:3000` | Base URL the route is appended to. |
| `SHOOT_FULL` | `1` | Set to `0` to skip full-page framings. |
| `SHOOT_WIDE` | `0` | Set to `1` to also capture a 1920×1080 ultrawide viewport. |
| `SHOOT_SCALE` | `1` | Device pixel ratio. Set to `2` for retina captures. |
| `SHOOT_FULL_HEIGHT` | `8000` | Cap on full-page capture height (px). |
| `SHOOT_CHROME` | playwright bundle | Override Chromium binary path. |

## Common usage

Capture all retina-ish:

```sh
SHOOT_SCALE=2 bun run shoot /
```

Capture only viewport (no scrolly full-page):

```sh
SHOOT_FULL=0 bun run shoot /
```

Capture against a deployed preview:

```sh
SHOOT_BASE=https://clarent-environmental-website-git-master.vercel.app bun run shoot /
```
