# Tooling Inventory

Last updated: 2026-05-06.

Update this file alongside any tooling change.

## Runtime

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.x | Framework (App Router, RSC, route handlers, ISR). Uses Turbopack as the dev compiler by default. |
| React | 19.x | UI runtime. |
| TypeScript | 5.x | Type system. `strict: true`. |
| Node | ≥ 22 | Required by Next 16. |
| Bun | 1.3.x | Package manager + script runtime. All `package.json` scripts run under Bun. |

## API + data

| Tool | Version | Purpose |
|---|---|---|
| Hono | 4.x | API router, mounted at `src/app/api/[[...route]]/route.ts`. |
| `@hono/node-server` | 2.x | Node adapter (kept available for non-route-handler use). |
| Zod | 4.x | Runtime validation; env schema in `src/lib/env.ts`. |
| Sanity | 5.x | CMS. Studio in-app at `/studio/`. |
| `next-sanity` | 12.x | Studio + client integration. |
| `@sanity/client`, `@sanity/image-url` | latest | Read client + image URL builder. |
| `@supabase/ssr`, `@supabase/supabase-js` | 0.10.x / 2.x | DB + auth. |
| `@hubspot/api-client` | 13.x | HubSpot contacts API. |
| `resend` | 6.x | Transactional email. |

## UI

| Tool | Version | Purpose |
|---|---|---|
| Tailwind CSS | v4 | Styling. PostCSS plugin: `@tailwindcss/postcss`. |
| shadcn/ui | n/a (CLI) | Component scaffolding. `bunx shadcn@latest add <component>`. |
| `radix-ui` | 1.x | Headless primitives. |
| `lucide-react` | latest | Icons. |
| `framer-motion` | 12.x | Motion (scoped, purposeful only). |
| `clsx`, `tailwind-merge`, `class-variance-authority` | latest | Class composition. |

## Dev tooling

| Tool | Version | Purpose |
|---|---|---|
| ESLint | 9.x | Lint. Flat config in `eslint.config.mjs`. |
| `eslint-config-next` | 16.x | Next presets (core-web-vitals, typescript). |
| Playwright | 1.x | Bundled Chromium for the screenshot pipeline. **Not** used as a test runner. |
| `jsdom` + `@types/jsdom` | latest | HTML parsing helper. |
| `tsx` | 4.x | TypeScript execution for arbitrary scripts. |
| `sharp` | 0.34.x | `next/image` build-time processing. In `trustedDependencies`. |
| `unrs-resolver` | n/a | Native resolver used by Next. In `trustedDependencies`. |

## Hosting

| Tool | Purpose |
|---|---|
| Vercel | Production hosting. Auto-deploy on push to `master`. |
| GitHub | Repo hosting. Default branch `master`. |
| Vercel CLI | Installed globally (not in `package.json`) for deploy status and one-off ops. |

## Deliberately not present

- No test runner (Vitest, Jest, Playwright Test, etc.).
- No standalone Sanity Studio deploy.
- No state management library (no Redux, Zustand, Jotai, etc.).
- No analytics SDK in the bundle by default.
