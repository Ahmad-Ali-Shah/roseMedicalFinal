import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // If it is a password recovery, redirect to the generic reset-password page
  if (type === "recovery") {
    return NextResponse.redirect(`${requestUrl.origin}/reset-password`);
  }

  // Otherwise, redirect to the account page
  return NextResponse.redirect(`${requestUrl.origin}/account`);
}
