import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
  basePath: "/studio",
});
