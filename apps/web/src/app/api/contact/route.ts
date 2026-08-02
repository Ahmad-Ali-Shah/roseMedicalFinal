import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const spamKeywords = ["viagra", "v1agra", "cialis", "c1alis", "casino", "crypto", "bitcoin", "pharma", "lottery", "xxx", "loan"];

function checkSpam(text) {
  const lower = text.toLowerCase();
  const clean = lower.replace(/[^a-z0-9]/g, "");
  for (const kw of spamKeywords) {
    if (lower.includes(kw) || clean.includes(kw)) return true;
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createClient();

    // Honeypot
    if (body.company_name) return NextResponse.json({ success: true });

    // Phone validation
    let p = (body.phone || "").split(" ").join("").split("-").join("");
    if (p.indexOf("+") !== 0) p = "+" + p;
    if (p.length < 8) return NextResponse.json({ error: "Invalid phone." }, { status: 400 });

    // Required fields
    if (body.name === "" || body.email === "" || body.message === "") {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    let isSpam = checkSpam(body.message || "");

    if (!isSpam) {
      const msg = body.message || "";
      let url = null;
      if (msg.indexOf("http") !== -1) {
        const words = msg.split(" ");
        for (const word of words) {
          if (word.indexOf("http") === 0) { url = word; break; }
        }
      }
      if (url) {
        const twentyFourHoursAgo = new Date(Date.now() - 86400000).toISOString();
        const { data: cached } = await supabase.from("crawled_urls").select("is_spam").eq("url", url).gt("crawled_at", twentyFourHoursAgo).maybeSingle();
        if (cached) {
          isSpam = cached.is_spam;
        } else {
          try {
            const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
            if (res.ok) {
              const html = await res.text();
              let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ");
              text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
              text = text.replace(/<[^>]+>/g, " ");
              if (checkSpam(text)) isSpam = true;
            }
          } catch (e) {}
          await supabase.from("crawled_urls").upsert({ url: url, is_spam: isSpam, crawled_at: new Date().toISOString() });
        }
      }
    }

    const { data } = await supabase.auth.getUser();
    const userId = data.user ? data.user.id : null;
    
    // Insert with the new fields included
    const { error } = await supabase.from("contact_messages").insert({
      user_id: userId,
      name: body.name,
      email: body.email,
      phone: p,
      message: body.message,
      is_spam: isSpam,
      company: body.company || null,
      country: body.country || null,
      subject: body.subject || null
    });

    if (error) return NextResponse.json({ error: "DB error" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
