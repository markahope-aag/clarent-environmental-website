import { env } from "@/lib/env";

export const sanityConfig = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: env.NODE_ENV === "production",
};
