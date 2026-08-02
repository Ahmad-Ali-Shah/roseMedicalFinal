import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { id, status, date } = await req.json();

    const updateData: any = { status: status };

    if (status === "Contacted" && date) {
      updateData.appointment_date = date;
      updateData.notification = `Meeting scheduled for ${date}`;
    } else if (status === "Closed") {
      updateData.notification = "Inquiry declined and closed";
    } else if (status === "Reviewed") {
      updateData.notification = "Inquiry reviewed";
    } else {
      updateData.notification = `Status updated to ${status}`;
    }

    const { data, error } = await supabase
      .from("quote_requests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
