import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),
  SANITY_API_TOKEN: z.string().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),
  HUBSPOT_ACCESS_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_ADDRESS: z
    .string()
    .email()
    .default("hello@clarentenvironmental.com"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://clarentenvironmental.com"),
});

// Only validate server-side env at runtime — NEXT_PUBLIC_ keys are
// safe to validate everywhere.
function getEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => i.path.join("."))
      .join(", ");
    throw new Error(`Missing or invalid env vars: ${missing}`);
  }
  return result.data;
}

export const env = getEnv();
export type Env = z.infer<typeof envSchema>;
