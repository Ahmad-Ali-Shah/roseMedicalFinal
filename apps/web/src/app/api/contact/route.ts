import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseContactPayload, PublicRequestError, readBoundedJson } from "@/lib/http/public-request";

const spamKeywords = ["viagra", "v1agra", "cialis", "c1alis", "casino", "crypto", "bitcoin", "pharma", "lottery", "xxx", "loan"];

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
    const valueA = vecA[key] ?? 0;
    const valueB = vecB[key] ?? 0;
    dot += valueA * valueB;
    magA += valueA ** 2;
  }
  for (const key in vecB) {
    const valueB = vecB[key] ?? 0;
    magB += valueB ** 2;
  }

  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await readBoundedJson(req, 16_384);
    if (rawBody && typeof rawBody === "object" && "company_name" in rawBody && Boolean((rawBody as { company_name?: unknown }).company_name)) {
      return NextResponse.json({ success: true });
    }
    const parsed = parseContactPayload(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Check the contact details and message, then try again." }, { status: 400 });
    }
    const body = parsed.data;
    const supabase = await createClient();

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
      phone: body.phone,
      message: body.message,
      is_spam: isSpam,
      company: body.company || null,
      country: body.country || null,
      subject: body.subject || null
    });

    if (error) return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof PublicRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
