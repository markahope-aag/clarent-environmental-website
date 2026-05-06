# Clarent Web — Architectural Memory

## Project
Marketing website for Clarent Environmental (clarentenvironmental.com).
Hazardous waste broker/platform for Small Quantity Generators (SQGs).

## Data Architecture
- **Sanity**: all editorial content (blog, pages, services, team, testimonials, FAQs)
- **Supabase**: transactional data and mirror of HubSpot contacts
- **HubSpot**: canonical store for leads and contacts; forms write-through here
- Rule: never duplicate editorial content in Supabase; never store contacts as canonical in Sanity

## Routing
- Next.js 16 App Router, trailingSlash: true
- proxy.ts replaces middleware.ts (Next 16 convention)
- Hono 4 API mounted at src/app/api/[[...route]]/route.ts
- Sanity Studio mounted in-app at /studio/ — do NOT deploy to sanity.studio.io

## Stack
Next.js 16 · React 19 · TypeScript strict · Bun · Tailwind v4
Hono 4 · Zod 4 · Supabase SSR · Sanity · HubSpot · Resend
shadcn/ui · Radix UI · framer-motion · lucide-react

## Deployment
- Vercel, auto-deploy on push to master
- Default branch: master. Direct-to-master workflow.
- No feature branches unless hotfix.

## Brand
- Orange: #E85E00 (primary), #C24E00 (deep/hover)
- Text: #1C2B2A (charcoal primary), #2E4A47 (forest secondary)
- Backgrounds: #F5F2ED (warm white), #E8E2D9 (sand), #FFF0E6 (orange tint)
- Font: Poppins (Light 300, Regular 400, Medium 500, Bold 700)
- Tagline: Compliance made simple.

## Deliberate omissions
- No test runner (Vitest, Jest, etc.)
- No state management library
- No analytics SDK in the bundle by default
- No standalone Sanity Studio deploy
