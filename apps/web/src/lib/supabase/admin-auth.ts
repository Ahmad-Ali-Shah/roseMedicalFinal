import "server-only";
import { createClient } from "./server";

export interface AdminProfileLike {
  role?: string | null;
}

export function isAdminProfile(profile: AdminProfileLike | null | undefined): boolean {
  return profile?.role === "admin";
}

export async function requireAdminUser(): Promise<{ userId: string }> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Admin authentication is required.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !isAdminProfile(profile)) {
    throw new Error("Admin authorization is required.");
  }

  return { userId: user.id };
}
