import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "All inquiry states";

  let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
  
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  
  if (status !== "All inquiry states") {
    query = query.eq("status", status);
  }
  
  const { data } = await query;
  return NextResponse.json(data || []);
}
