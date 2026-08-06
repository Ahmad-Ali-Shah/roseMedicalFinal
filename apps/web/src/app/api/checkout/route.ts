import { NextRequest, NextResponse } from "next/server";
import {
  createQuotationHash,
  formatQuotationMessage,
  normalizeQuotationPayload
} from "@/features/inquiry/quotation-payload";
import { createAdminClient } from "@/lib/supabase/admin";
import { PublicRequestError, readBoundedJson } from "@/lib/http/public-request";

export async function POST(req: NextRequest) {
  try {
    const result = normalizeQuotationPayload(await readBoundedJson(req, 98_304));
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const payload = result.value;
    const cartHash = createQuotationHash(payload);
    const supabase = createAdminClient();

    const { data: existing, error: lookupError } = await supabase
      .from("quote_requests")
      .select("id")
      .eq("cart_hash", cartHash)
      .maybeSingle();

    if (lookupError) {
      console.error("Quotation duplicate lookup failed:", lookupError);
      return NextResponse.json({ error: "Unable to submit quotation request." }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json(
        { error: "This exact quotation request has already been submitted." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        user_id: null,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: formatQuotationMessage(payload),
        cart_hash: cartHash,
        status: "New"
      })
      .select("id")
      .single();

    if (error) {
      console.error("Quotation insert failed:", error);
      return NextResponse.json({ error: "Unable to submit quotation request." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    if (error instanceof PublicRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Quotation route failed:", error);
    return NextResponse.json({ error: "Unable to submit quotation request." }, { status: 500 });
  }
}
