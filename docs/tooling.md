# Tooling Inventory

| Tool | Version | Purpose |
|------|---------|---------|
| Bun  | latest  | Package manager and script runner |
| Next.js | 16   | Framework |
| TypeScript | 5+ | Types — strict mode |
| Tailwind CSS | v4 | Styling |
| ESLint | 9    | Linting — flat config |
| Playwright | latest | Screenshot pipeline only |
| Turbopack | (built-in) | Dev compiler |
| Vercel CLI | latest (global) | Deploy ops |

## No test runner
Deliberate omission. QA is manual + screenshot pipeline + visual review.
Lint and typecheck are the automated quality gates.

## Pre-push checklist
  bun run lint
  bun run typecheck
