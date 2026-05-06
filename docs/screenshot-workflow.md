# Screenshot Workflow

## Usage
  bun run shoot /           # captures homepage
  bun run shoot /services/  # captures services page

## Output
Saved to .screenshots/<slug>/<viewport>.png (gitignored).
Viewports: mobile (375), tablet (768), desktop (1440) at 2× scale.
Reduced motion is always forced for deterministic captures.

## Environment variables
  SHOOT_BASE        Base URL (default: http://localhost:3000)
  SHOOT_FULL        Full-page scroll capture (default: true)
  SHOOT_SCALE       Device pixel ratio (default: 2)
  SHOOT_CHROME      Path to custom Chrome binary

## Prerequisites
Dev server must be running: bun run dev
