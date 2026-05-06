# Clarent Design System

## Color Tokens

| Token                     | Value     | Use |
|---------------------------|-----------|-----|
| --color-orange            | #E85E00   | Primary brand, CTAs, diamond mark |
| --color-orange-deep       | #C24E00   | Hover states, active CTAs |
| --color-charcoal          | #1C2B2A   | Primary text, navigation |
| --color-forest            | #2E4A47   | Secondary text, footer |
| --color-warm-white        | #F5F2ED   | Page background |
| --color-sand              | #E8E2D9   | Cards, surfaces, borders |
| --color-orange-tint       | #FFF0E6   | Highlight states, callouts |

## Typography

Font family: **Poppins** (Google Fonts)
Loaded via next/font/google as CSS variable --font-poppins.

| Weight | Use |
|--------|-----|
| 300 Light   | Captions, footnotes, supporting text |
| 400 Regular | Body copy, descriptions |
| 500 Medium  | UI labels, headings, logo wordmark |
| 700 Bold    | Display headlines, section titles |

Letter spacing: all-caps labels use +0.08em to +0.12em tracking.

## Spacing
--space-section: 6rem (96px) — between major page sections
--space-section-sm: 4rem (64px) — tighter sections
--space-component: 2rem (32px)

## Radius
--radius-sm (4px), --radius-md (8px), --radius-lg (12px),
--radius-xl (16px), --radius-2xl (24px)

## Motion
Keep motion purposeful. No decorative scroll reveals.
- Fast: 150ms (micro-interactions)
- Normal: 250ms (UI transitions)
- Slow: 400ms (page-level transitions)
- Ease: cubic-bezier(0.16, 1, 0.3, 1) — snappy ease-out

## Component conventions
- Use cn() from @/lib/cn for class composition
- Use class-variance-authority for variant-rich components
- Prefer CSS custom properties over Tailwind arbitrary values
