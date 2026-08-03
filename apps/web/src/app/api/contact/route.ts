import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const spamKeywords = ["viagra", "v1agra", "cialis", "c1alis", "casino", "crypto", "bitcoin", "pharma", "lottery", "xxx", "loan"];

interface ContactRequestBody {
  company_name?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  subject?: string;
  message?: string;
}

function checkSpam(text: string) {
  const lower = text.toLowerCase();
  const clean = lower.replace(/[^a-z0-9]/g, "");
  for (const keyword of spamKeywords) {
    if (lower.includes(keyword) || clean.includes(keyword)) return true;
  }
  return false;
}

function getTokens(text: string): string[] {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function vectorize(tokens: string[]): Record<string, number> {
  const frequency: Record<string, number> = {};
  tokens.forEach((token) => {
    frequency[token] = (frequency[token] || 0) + 1;
  });
  return frequency;
}

function cosineSim(vecA: Record<string, number>, vecB: Record<string, number>): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const key in vecA) {
    if (vecB[key]) dot += vecA[key] * vecB[key];
    magA += vecA[key] ** 2;
  }
  for (const key in vecB) magB += vecB[key] ** 2;

  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactRequestBody;
    const supabase = await createClient();

    if (body.company_name) return NextResponse.json({ success: true });

    let phone = (body.phone || "").split(" ").join("").split("-").join("");
    if (!phone.startsWith("+")) phone = `+${phone}`;
    if (phone.length < 8) {
      return NextResponse.json({ error: "Invalid phone." }, { status: 400 });
    }

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    let isSpam = checkSpam(body.message);

    if (!isSpam) {
      const newVector = vectorize(getTokens(body.message));
      const { data: oldMessages } = await supabase
        .from("seen_messages")
        .select("message")
        .limit(50);

      if (oldMessages) {
        for (const old of oldMessages) {
          if (cosineSim(newVector, vectorize(getTokens(old.message))) > 0.75) {
            isSpam = true;
            break;
          }
        }
      }
    }

    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id ?? null;

    const { error } = await supabase.from("contact_messages").insert({
      user_id: userId,
      name: body.name,
      email: body.email,
      phone,
      message: body.message,
      is_spam: isSpam,
      company: body.company || null,
      country: body.country || null,
      subject: body.subject || null
    });

    if (error) return NextResponse.json({ error: "DB error" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
