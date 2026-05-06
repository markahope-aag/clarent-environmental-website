import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { sanityConfig } from "@/lib/sanity/config";
import { schema } from "@/sanity/schema";

export default defineConfig({
  name: "default",
  title: "Clarent Environmental",
  basePath: "/studio",
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: sanityConfig.apiVersion })],
});
