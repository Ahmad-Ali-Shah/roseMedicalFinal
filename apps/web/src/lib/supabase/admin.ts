import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { resolveAdminSupabaseCredentials } from "./admin-security";

export function createAdminClient() {
  const { url, serviceRoleKey } = resolveAdminSupabaseCredentials({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
  });

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
