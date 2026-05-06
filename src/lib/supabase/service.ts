import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createServiceClient() {
  return createSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
