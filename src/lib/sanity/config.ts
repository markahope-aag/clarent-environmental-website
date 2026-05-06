import { env } from "@/lib/env";

export const sanityConfig = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
};
