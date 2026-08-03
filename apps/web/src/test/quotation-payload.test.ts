import { describe, expect, it } from "vitest";
import {
  createQuotationHash,
  formatQuotationMessage,
  normalizeQuotationPayload
} from "@/features/inquiry/quotation-payload";

const validPayload = {
  name: "Muhammad Ahmad",
  company: "Rosa Buyer",
  email: "buyer@example.com",
  phone: "+923001234567",
  country: "Pakistan",
  notes: "Please quote standard packing.",
  items: [
    {
      id: "product_scalpel_handle_3",
      familySlug: "knives",
      slug: "scalpel-handle-no-3",
      name: "Scalpel Handle No. 3",
      code: "01-0103",
      size: "No. 3",
      variant: "Standard",
      quantity: 2,
      notes: "Sterile packing"
    }
  ]
};

describe("quotation payload", () => {
  it("normalizes a valid public request", () => {
    const result = normalizeQuotationPayload(validPayload);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.email).toBe("buyer@example.com");
    expect(result.value.items[0]?.quantity).toBe(2);
  });

  it("rejects empty item lists and invalid contact fields", () => {
    expect(normalizeQuotationPayload({ ...validPayload, items: [] }).ok).toBe(false);
    expect(normalizeQuotationPayload({ ...validPayload, email: "bad-email" }).ok).toBe(false);
    expect(normalizeQuotationPayload({ ...validPayload, phone: "11111111" }).ok).toBe(false);
  });

  it("formats an immutable readable product snapshot", () => {
    const result = normalizeQuotationPayload(validPayload);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const message = formatQuotationMessage(result.value);
    expect(message).toContain("Scalpel Handle No. 3");
    expect(message).toContain("Code: 01-0103");
    expect(message).toContain("Quantity: 2");
    expect(message).toContain("Sterile packing");
  });

  it("produces stable exact-request hashes", () => {
    const first = normalizeQuotationPayload(validPayload);
    const second = normalizeQuotationPayload({ ...validPayload, email: " BUYER@example.com " });
    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(createQuotationHash(first.value)).toBe(createQuotationHash(second.value));
    expect(createQuotationHash(first.value)).not.toBe(
      createQuotationHash({ ...first.value, items: [{ ...first.value.items[0]!, quantity: 3 }] })
    );
  });
});
