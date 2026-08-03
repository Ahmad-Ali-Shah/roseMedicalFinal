import { NextResponse } from "next/server";
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

  const ownerUserId = process.env.ROSA_OWNER_USER_ID?.trim();
  const ownerEmail = process.env.ROSA_OWNER_EMAIL?.trim().toLowerCase();

  if (!ownerUserId && !ownerEmail) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Owner access is not configured" }, { status: 503 })
    };
  }

  const matchesOwnerId = ownerUserId === auth.user.id;
  const matchesOwnerEmail = Boolean(
    ownerEmail && auth.user.email?.trim().toLowerCase() === ownerEmail
  );

  if (!matchesOwnerId && !matchesOwnerEmail) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Owner access required" }, { status: 403 })
    };
  }

  return auth;
}
