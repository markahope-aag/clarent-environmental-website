# Sanity Setup

Sanity is the canonical store for editorial content. The Studio mounts **in-app**
at `/studio/`. We never deploy to `sanity.studio.io`.

## Environment

Add to `.env.local`:

```ini
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...        # only when reading drafts or private datasets
SANITY_WEBHOOK_SECRET=...   # for revalidation webhook auth
```

`NEXT_PUBLIC_SANITY_PROJECT_ID` is required at boot (Zod schema in `src/lib/env.ts`).
`NEXT_PUBLIC_SANITY_DATASET` defaults to `production`.

In the Sanity dashboard at <https://www.sanity.io/manage>, add `http://localhost:3000`
and the production URL to **API → CORS origins** so the in-app Studio can authenticate.

## Studio

Studio runs in-app at:

- Development: <http://localhost:3000/studio/>
- Production: same path on the deployed site

Files:

| File | Role |
|---|---|
| `sanity.config.ts` (project root) | Studio config — projectId, dataset, schema, plugins, basePath |
| `src/app/studio/[[...tool]]/page.tsx` | `"use client"` page that renders `<NextStudio />` |
| `src/app/studio/layout.tsx` | Minimal layout (no app chrome) so Studio renders edge-to-edge |
| `src/lib/sanity/client.ts` | `sanityClient` and `urlFor()` |
| `src/lib/sanity/queries.ts` | Reusable GROQ queries (`postsQuery`, `postBySlugQuery`, `servicesQuery`, `testimonialsQuery`, `faqsQuery`) |
| `src/lib/sanity/schemas/` | One file per schema type, registered in `index.ts` |
| `src/lib/sanity/index.ts` | Barrel export |

The `visionTool` plugin (GROQ playground inside the Studio) is loaded **only in
development**.

## Schema types

| Type | Purpose | Key fields |
|---|---|---|
| `post` | Blog post | `title`, `slug`, `excerpt`, `body` (blocks), `publishedAt`, `featuredImage`, `tags` |
| `page` | Generic static page | `title`, `slug`, `seo` (object: `metaTitle`, `metaDescription`), `body` |
| `service` | Hazardous waste service category | `title`, `slug`, `excerpt`, `wasteCategory` (`rcra_hazardous` / `universal_waste` / `used_oil` / `conditional_exclusion`), `icon`, `description`, `order` |
| `industry` | Target industry vertical | `title`, `slug`, `excerpt`, `description`, `wasteStreams` (refs to `service`), `order` |
| `testimonial` | Customer testimonial | `quote`, `author`, `company`, `industry`, `state`, `order` |
| `faq` | FAQ entry | `question`, `answer`, `category` (`regulatory` / `pricing` / `process` / `compliance`), `order` |
| `teamMember` | Team member | `name`, `title`, `bio`, `photo`, `order` |

## Querying content

Use GROQ via `sanityClient.fetch()` from a Server Component or Route Handler:

```ts
import { sanityClient, postsQuery } from "@/lib/sanity";

const posts = await sanityClient.fetch(postsQuery);
```

For one-off queries, import `groq` from `next-sanity` and inline:

```ts
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";

const result = await sanityClient.fetch(
  groq`*[_type == "service" && slug.current == $slug][0]`,
  { slug }
);
```

## Adding a new schema type

1. Create `src/lib/sanity/schemas/<typeName>.ts` exporting a `defineType(...)` definition.
2. Import + register it in `src/lib/sanity/schemas/index.ts` — both as a re-export and inside the `schemaTypes` array.
3. Reload `/studio/` — the new type appears in the document list.

## Revalidation webhook

Sanity → site webhook should call `/api/revalidate` with `SANITY_WEBHOOK_SECRET`
in a header. The Hono API route owns that endpoint when it ships.
