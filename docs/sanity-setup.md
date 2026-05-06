# Sanity Setup

Sanity is the canonical store for editorial content. The Studio is mounted
**in-app** at `/studio/`. We do not deploy a standalone Studio to
`sanity.studio.io`.

## Files

| File | Role |
|---|---|
| `sanity.config.ts` | Studio config (project id, dataset, schema, plugins). Imported by both the in-app Studio route and CLI tools. |
| `src/lib/sanity/config.ts` | Shared runtime config (project id, dataset, API version, useCdn). Read from env. |
| `src/lib/sanity/client.ts` | `sanityClient` (CDN, published) and `sanityReadClient` (no CDN, raw, token). |
| `src/lib/sanity/image.ts` | `urlFor()` helper. |
| `src/sanity/schema/index.ts` | Schema types registry. Add new document/object types here. |
| `src/app/studio/[[...tool]]/page.tsx` | Mounts `<NextStudio>` at `/studio/`. |
| `src/app/studio/layout.tsx` | Minimal layout (no app chrome) so the Studio renders edge-to-edge. |

## First-time project setup

1. Create a project at <https://www.sanity.io/manage> and note the project id.
2. Add to `.env.local`:
   ```ini
   NEXT_PUBLIC_SANITY_PROJECT_ID=...
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
   SANITY_API_READ_TOKEN=...   # only if reading drafts or a private dataset
   ```
3. In the Sanity dashboard, add `http://localhost:3000` and the production URL to **API → CORS origins** so the in-app Studio can authenticate.
4. `bun run dev` and visit <http://localhost:3000/studio/>.

## Adding a content type

1. Create `src/sanity/schema/<type-name>.ts` exporting a `defineType(...)` definition.
2. Register it in `src/sanity/schema/index.ts`:
   ```ts
   import { post } from "./post";
   export const schema = { types: [post] };
   ```
3. Reload `/studio/` — the new type appears in the document list.

## Querying content

Use `sanityClient.fetch(groq, params)` from a Server Component or Route Handler.
For draft preview, use `sanityReadClient` with the read token.

```ts
import { sanityClient } from "@/lib/sanity/client";

const posts = await sanityClient.fetch<Post[]>(
  `*[_type == "post"] | order(publishedAt desc)`
);
```

## Revalidation webhook

Sanity → Vercel webhook should call `/api/revalidate` with `SANITY_REVALIDATE_SECRET` in a header. The Hono API route owns that endpoint when it ships.
