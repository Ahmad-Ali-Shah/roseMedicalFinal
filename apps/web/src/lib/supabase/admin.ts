import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { resolveAdminSupabaseCredentials } from "./admin-security";

export function createAdminClient() {
  const { url, serviceRoleKey } = resolveAdminSupabaseCredentials(process.env);
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
