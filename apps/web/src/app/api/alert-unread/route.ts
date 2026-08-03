import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function matchesBearerSecret(request: Request, secret: string): boolean {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return false;

  const provided = Buffer.from(authorization.slice(7));
  const expected = Buffer.from(secret);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

export async function POST(req: Request) {
  try {
    const secret = process.env.ALERT_UNREAD_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Alert route is not configured" }, { status: 503 });
    }

    if (!matchesBearerSecret(req, secret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data: unreadMessages, error: dbError } = await supabase
      .from("unread_after_20")
      .select("name, email, message")
      .order("created_at", { ascending: false })
      .limit(5);

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    if (unreadMessages && unreadMessages.length > 0) {
      const emailBody = unreadMessages
        .map((message) => `From: ${message.name} (${message.email})\nMessage: ${message.message}\n\n`)
        .join("");

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "RosaMedical Alerts <onboarding@resend.dev>",
          to: ["ahmadaliofficial1155@gmail.com"],
          subject: "⚠️ Unread Messages Archived - Action Required",
          text: `Sir kindly view these messages or if you ignore these are delete in 5 days.\n\n${emailBody}`
        })
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend failed:", errText);
        return NextResponse.json({ error: "Resend failed", detail: errText }, { status: 502 });
      }
    }

    return NextResponse.json({ success: true, count: unreadMessages?.length ?? 0 });
  } catch (error) {
    console.error("Route crashed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
