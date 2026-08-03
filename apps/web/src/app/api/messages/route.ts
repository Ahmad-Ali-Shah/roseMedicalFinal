import { NextResponse } from "next/server";
import { requireApiOwner } from "@/lib/supabase/api-auth";

export async function GET() {
  const auth = await requireApiOwner();
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("contact_messages")
    .select("*")
    .eq("is_spam", false)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load messages" }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
