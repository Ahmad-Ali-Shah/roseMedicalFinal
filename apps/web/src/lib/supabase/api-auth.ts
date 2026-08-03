import { NextResponse } from "next/server";
import { isConfiguredOwner } from "@/lib/supabase/owner-identity";
import { createClient } from "@/lib/supabase/server";

export async function requireApiUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 })
    };
  }

  return { ok: true as const, supabase, user };
}

export async function requireApiOwner() {
  const auth = await requireApiUser();
  if (!auth.ok) return auth;

  const isOwner = isConfiguredOwner(auth.user, {
    ownerUserId: process.env.ROSA_OWNER_USER_ID,
    ownerEmail: process.env.ROSA_OWNER_EMAIL
  });

  if (!isOwner) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Owner access required" }, { status: 403 })
    };
  }

  return auth;
}
