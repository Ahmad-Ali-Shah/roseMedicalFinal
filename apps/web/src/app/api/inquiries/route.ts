import { NextResponse } from "next/server";
import { requireApiOwner, requireApiUser } from "@/lib/supabase/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope");
  const auth = scope === "mine" ? await requireApiUser() : await requireApiOwner();

  if (!auth.ok) return auth.response;

  const database = scope === "mine" ? auth.supabase : createAdminClient();
  let query = database
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (scope === "mine") {
    query = query.eq("user_id", auth.user.id);
  } else {
    const search = (searchParams.get("search") || "").replace(/[%,().]/g, " ").trim();
    const status = searchParams.get("status") || "All inquiry states";

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (status !== "All inquiry states") {
      query = query.eq("status", status);
    }
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Failed to load inquiries" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
