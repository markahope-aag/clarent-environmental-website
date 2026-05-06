import { createClient } from "next-sanity";
import { sanityConfig } from "./config";
import { env } from "@/lib/env";

export const sanityClient = createClient({
  ...sanityConfig,
  perspective: "published",
});

export const sanityReadClient = createClient({
  ...sanityConfig,
  perspective: "raw",
  ...(env.SANITY_API_TOKEN !== undefined ? { token: env.SANITY_API_TOKEN } : {}),
  useCdn: false,
});
