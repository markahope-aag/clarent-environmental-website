# Clarent Environmental — Marketing Website

clarentenvironmental.com

## Stack
Next.js 16 · React 19 · TypeScript · Bun · Tailwind v4 · Sanity · Supabase

## Prerequisites
- Bun: https://bun.sh
- Chromium for screenshots: `bunx playwright install chromium`
- `.env.local` populated from `.env.example`

## Development
  bun install
  bun run dev          # http://localhost:3000

## Quality gates (run before pushing)
  bun run typecheck
  bun run lint

## Environment variables
See `.env.example` for all required keys.

## Branch: master — direct-to-master workflow
