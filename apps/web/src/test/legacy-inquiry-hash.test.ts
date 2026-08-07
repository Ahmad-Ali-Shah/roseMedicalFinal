import { describe, expect, it } from "vitest";
import {
  createLegacyQuotationHash,
  createQuotationHash,
  type QuotationPayload
} from "@/features/inquiry/quotation-payload";
import {
  createLegacyStaticQuotationHash,
  createQuotationHashCandidates
} from "@/features/catalogue-migration/legacy-inquiry-hash";

const livePayload: QuotationPayload = {
  name: "Buyer",
  company: "Clinic",
  email: "buyer@example.com",
  phone: "+923001234567",
  country: "Pakistan",
  notes: "",
  items: [
    {
      id: "live-database-uuid",
      familySlug: "knives",
      slug: "scalpel-handle-no-3",
      name: "Scalpel Handle No. 3",
      code: "18-0644",
      size: "14.5 cm",
      variant: "Standard",
      quantity: 1,
      notes: ""
    }
  ]
};

describe("legacy inquiry hash migration compatibility", () => {
  it("reconstructs the pre-cutover hash using the approved static product id", () => {
    const expected: QuotationPayload = {
      ...livePayload,
      items: [
        {
          ...livePayload.items[0]!,
          id: "product_scalpel_handle_3"
        }
      ]
    };

    expect(createLegacyStaticQuotationHash(livePayload)).toBe(
      createLegacyQuotationHash(expected)
    );
  });

  it("returns both stable and legacy hashes while old quote rows may exist", () => {
    const legacy = createLegacyStaticQuotationHash(livePayload);
    expect(legacy).toBeTruthy();
    expect(createQuotationHashCandidates(livePayload)).toEqual([
      createQuotationHash(livePayload),
      legacy
    ]);
  });

  it("returns null if an inquiry item has no approved legacy route mapping", () => {
    expect(
      createLegacyStaticQuotationHash({
        ...livePayload,
        items: [
          {
            ...livePayload.items[0]!,
            familySlug: "knives",
            slug: "not-a-real-product"
          }
        ]
      })
    ).toBeNull();
  });
});
