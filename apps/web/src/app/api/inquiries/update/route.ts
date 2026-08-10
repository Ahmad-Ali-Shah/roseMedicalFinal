import { NextResponse } from "next/server";
import { requireApiOwner } from "@/lib/supabase/api-auth";
import { createAdminClient } from "@/lib/supabase/admin";

interface InquiryUpdateRequest {
  id: string;
  status: string;
  note?: string;
}

const STATUSES = new Set(["New", "Reviewed", "Contacted", "Closed"]);

export async function POST(req: Request) {
  try {
    const auth = await requireApiOwner();
    if (!auth.ok) return auth.response;

    const { id, status, note } = await req.json() as InquiryUpdateRequest;
    if (!id || !STATUSES.has(status)) {
      return NextResponse.json({ error: "Invalid inquiry update" }, { status: 400 });
    }
    const updateData = { status, notification: note?.trim() || null };

    const { data, error } = await createAdminClient()
      .from("quote_requests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireApiOwner();
  if (!auth.ok) return auth.response;
  const id = new URL(req.url).searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "Inquiry id is required" }, { status: 400 });

  const { error } = await createAdminClient().from("quote_requests").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
