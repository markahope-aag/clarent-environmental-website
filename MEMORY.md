# MEMORY

Durable architectural decisions for this project. Treat as authoritative — if a
design choice contradicts what is here, update this file as part of the change.

## Data ownership

Three systems, one job each:

- **Sanity** — canonical store for **editorial content** (pages, articles, case studies, navigation, etc.). Studio is mounted in-app at `/studio/`; we do not deploy a standalone studio to `sanity.studio.io`.
- **Supabase** — canonical store for **transactional data** (sessions, app records) and the **mirror** of contacts pulled from HubSpot for fast querying / joins.
- **HubSpot** — canonical store for **contacts and subscribers**. Public forms write through to HubSpot; Supabase mirrors for read paths that need joins.

Write-through rule: whenever a public form captures contact data, the request hits HubSpot first; only after a successful HubSpot upsert do we write the mirror row to Supabase.

## Routing and runtime

- **Next.js 16, App Router only.** No `pages/` directory.
- `trailingSlash: true` is set in `next.config.ts`. Always link with trailing slashes.
- Middleware lives in `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`). The proxy refreshes Supabase sessions on every non-static request.
- API surface is **Hono**, mounted as a single catch-all route at `src/app/api/[[...route]]/route.ts`. Add API endpoints to that Hono app — do not create sibling `route.ts` files unless there is a strong reason.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss`. There is no `tailwind.config.js` — design tokens live as CSS custom properties in `src/app/globals.css` under `@theme`.
- shadcn/ui is preconfigured (`components.json`). Add components on demand with `bunx shadcn@latest add <component>`. Generated components land in `src/components/ui/`.

## Testing

No test runner. Quality gates are:

1. `bun run typecheck` (`tsc --noEmit`)
2. `bun run lint` (ESLint flat config)
3. `bun run shoot <route>` (deterministic screenshot pipeline) for visual review

Do not introduce Jest, Vitest, Playwright Test, or any other unit/integration test runner without first updating this section.

## Deployment

- Production: **Vercel**, auto-deploy on push to `master`.
- Default branch: `master`. Direct-to-master workflow — no feature branches.
- Vercel CLI is installed globally on each developer's machine; it is **not** in `package.json`.
