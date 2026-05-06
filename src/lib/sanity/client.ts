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
  token: env.SANITY_API_READ_TOKEN,
  useCdn: false,
});
