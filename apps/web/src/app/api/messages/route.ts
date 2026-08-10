import { NextResponse } from "next/server";
import { requireApiOwner } from "@/lib/supabase/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const STATUSES = new Set(["New", "Reviewed", "Closed"]);

export async function GET(req: Request) {
  const auth = await requireApiOwner();
  if (!auth.ok) return auth.response;

  const searchParams = new URL(req.url).searchParams;
  const search = (searchParams.get("search") || "").replace(/[%,().]/g, " ").trim();
  const status = searchParams.get("status")?.trim() || "";
  let query = createAdminClient()
    .from("contact_messages")
    .select("*")
    .eq("is_spam", false)
    .order("created_at", { ascending: false });

  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`);
  if (status === "Reviewed") query = query.in("status", ["Reviewed", "Read", "Replied"]);
  else if (STATUSES.has(status)) query = query.eq("status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function PATCH(req: Request) {
  const auth = await requireApiOwner();
  if (!auth.ok) return auth.response;
  const body = await req.json() as { id?: string; status?: string; note?: string };
  if (!body.id || !body.status || !STATUSES.has(body.status)) {
    return NextResponse.json({ error: "Invalid message update" }, { status: 400 });
  }
  const { data, error } = await createAdminClient()
    .from("contact_messages")
    .update({ status: body.status, read: body.status !== "New", admin_note: body.note?.trim() || null })
    .eq("id", body.id)
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const auth = await requireApiOwner();
  if (!auth.ok) return auth.response;
  const id = new URL(req.url).searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "Message id is required" }, { status: 400 });
  const { error } = await createAdminClient().from("contact_messages").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
