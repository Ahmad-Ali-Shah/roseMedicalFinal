import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export interface AdminSupabaseCredentials {
  url: string;
  serviceRoleKey: string;
}

export function resolveAdminSupabaseCredentials(
  env: Pick<
    NodeJS.ProcessEnv,
    "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"
  > = process.env
): AdminSupabaseCredentials {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for privileged server operations."
    );
  }

  return { url, serviceRoleKey };
}

export function createAdminClient() {
  const { url, serviceRoleKey } = resolveAdminSupabaseCredentials();
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
