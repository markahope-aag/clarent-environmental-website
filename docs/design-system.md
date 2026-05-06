# Design System

## Where tokens live

Design tokens live in `src/app/globals.css` inside the `@theme` block. Tailwind
v4 reads `@theme` at compile time and exposes the tokens as utilities (`bg-background`, `text-muted-foreground`, etc.) and as CSS custom properties (`var(--color-background)`).

There is no `tailwind.config.js` and no JS export of tokens. Single source of truth: the `@theme` block.

## Token taxonomy

| Group | Examples | Notes |
|---|---|---|
| Surface | `--color-background`, `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border`, `--color-ring` | Neutral palette in OKLCH for perceptual uniformity. |
| Brand | `--color-primary`, `--color-primary-foreground`, `--color-accent`, `--color-accent-foreground` | Placeholder values until brand spec lands. |
| State | `--color-destructive`, `--color-destructive-foreground` | Error / danger surfaces. |
| Typography | `--font-sans`, `--font-serif`, `--font-mono`, `--text-base`, `--text-display` | Fluid type scales use `clamp(...)`. |
| Spacing | `--space-section` | Add tokens here as new vertical rhythm constants emerge. |
| Motion | `--duration-fast`, `--duration-normal`, `--duration-slow`, `--ease-out-expo`, `--ease-in-out-quart` | Use named easings, not raw cubic-beziers in components. |
| Radii | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` | |

## Adding a token

1. Add the property under `@theme` in `globals.css`.
2. If it has a dark-mode variant, add it inside the `@media (prefers-color-scheme: dark) @theme` block.
3. Document it in the table above.
4. Reference it via Tailwind utilities where possible (`bg-primary`, `rounded-md`) or `var(--token)` for arbitrary properties.

## Reduced motion

`globals.css` includes a `prefers-reduced-motion: reduce` media query that flattens animation/transition durations. Custom JS animations must also check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and short-circuit.

## Adding shadcn components

```sh
bunx shadcn@latest add button
```

Components land in `src/components/ui/`. They consume tokens via Tailwind
utilities; do not edit them to add raw color values — extend the token set instead.

## Anti-template policy

Per the global frontend rules: this site does not ship default shadcn-shaped
cards. Hierarchy, rhythm, and depth are deliberate, not uniform.
