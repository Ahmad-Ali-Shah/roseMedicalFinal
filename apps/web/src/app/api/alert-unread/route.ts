import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
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
        .map((m) => `From: ${m.name} (${m.email})\nMessage: ${m.message}\n\n`)
        .join("");

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "RosaMedical Alerts <onboarding@resend.dev>",
          to: ["ahmadaliofficial1155@gmail.com"],
          subject: "⚠️ Unread Messages Archived - Action Required",
          text: `Sir kindly view these messages or if you ignore these are delete in 5 days.\n\n${emailBody}`,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend failed:", errText);
        return NextResponse.json({ error: "Resend failed", detail: errText }, { status: 502 });
      }
    }

    return NextResponse.json({ success: true, count: unreadMessages?.length ?? 0 });
  } catch (err) {
    console.error("Route crashed:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
