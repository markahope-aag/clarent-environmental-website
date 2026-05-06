# Clarent Environmental — Website

Next.js 16 marketing + content site, deployed to Vercel.

## Stack

- **Next.js 16** (App Router, RSC, route handlers, ISR)
- **React 19**, **TypeScript** (strict)
- **Bun** as package manager and script runtime
- **Hono 4** API mounted at `src/app/api/[[...route]]/route.ts`
- **Tailwind CSS v4**, shadcn/ui, Radix primitives, lucide-react, framer-motion
- **Sanity** (Studio mounted at `/studio/`)
- **Supabase** (`@supabase/ssr`)
- **HubSpot** for contacts, **Resend** for transactional email

See [`MEMORY.md`](./MEMORY.md) for the architectural rules and [`docs/`](./docs/)
for setup guides.

## Prerequisites

- [Bun](https://bun.sh) (`bun --version` to verify)
- Chromium for the screenshot pipeline:
  ```sh
  bunx playwright install chromium
  ```
- A populated `.env.local` (copy `.env.example` and fill in)

## Scripts

| Script | What it does |
|---|---|
| `bun run dev` | Start the Turbopack dev server |
| `bun run build` | Production build |
| `bun run start` | Run the production build |
| `bun run lint` | ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run shoot <route>` | Capture mobile/tablet/desktop screenshots of a route |

The pre-push gate is `bun run lint && bun run typecheck`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in. All keys are optional at boot —
each subsystem fails loudly the first time a missing key is needed.

| Key | Required by |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, email links |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase clients (browser, server, proxy) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase clients |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only Supabase admin operations |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity client + Studio |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API pin |
| `SANITY_API_READ_TOKEN` | server-side Sanity reads (drafts, private datasets) |
| `SANITY_REVALIDATE_SECRET` | webhook revalidation auth |
| `HUBSPOT_ACCESS_TOKEN` | `src/lib/hubspot.ts` |
| `RESEND_API_KEY` | `src/lib/email.ts` |
| `RESEND_FROM` | default sender for transactional email |

## Project layout

```
src/
├── app/
│   ├── api/[[...route]]/route.ts  # Hono API mount
│   ├── studio/[[...tool]]/        # Sanity Studio
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css                # Design tokens via @theme
├── lib/
│   ├── env.ts                     # Zod-validated env schema
│   ├── utils.ts                   # cn()
│   ├── supabase/{browser,server,proxy}.ts
│   ├── sanity/{client,image,config}.ts
│   ├── hubspot.ts
│   └── email.ts
├── proxy.ts                       # Replaces middleware.ts in Next 16
└── sanity/schema/                 # Studio schema types
scripts/
└── shoot.ts                       # Screenshot pipeline
docs/
├── design-system.md
├── sanity-setup.md
├── screenshot-workflow.md
└── tooling.md
```

## Deployment

Push to `master` → Vercel auto-deploys.
