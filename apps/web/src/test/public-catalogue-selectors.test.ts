import { describe, expect, it } from "vitest";
import {
  FAMILY_SLUGS,
  familyHref,
  productHref,
  type ProductPreviewModel
} from "@/features/public-catalogue/models";
import {
  familyNameBySlug,
  selectFamilyCards,
  selectFeaturedProducts
} from "@/features/public-catalogue/selectors";

describe("public catalogue route models", () => {
  it("locks the approved family order", () => {
    expect(FAMILY_SLUGS).toEqual([
      "knives",
      "scissors",
      "punches",
      "chisels",
      "cutters"
    ]);
  });

  it("builds deterministic family and product paths", () => {
    const product: ProductPreviewModel = {
      id: "product_scalpel_handle_3",
      slug: "scalpel-handle-no-3",
      familySlug: "knives",
      familyName: "Knives",
      name: "Scalpel Handle No. 3",
      code: "18-0644",
      optionSummary: ["14.5 cm"],
      description: "Reusable surgical instrument handle presented for quotation review.",
      imageLabel: "Scalpel handle placeholder"
    };

    expect(familyHref("knives")).toBe("/products/knives");
    expect(productHref(product)).toBe("/products/knives/scalpel-handle-no-3");
  });

  it("maps all five shared families in approved order", () => {
    expect(selectFamilyCards().map((family) => family.slug)).toEqual(FAMILY_SLUGS);
    expect(selectFamilyCards()).toHaveLength(5);
  });

  it("maps shared products with family names and codes", () => {
    expect(selectFeaturedProducts()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "18-0644", familyName: "Knives", optionSummary: ["14.5 cm", "Standard"] }),
        expect.objectContaining({ code: "04-0402", familyName: "Scissors", optionSummary: ["17 cm", "Curved"] }),
        expect.objectContaining({ code: "23-1204", familyName: "Punches", optionSummary: ["4 mm", "Standard"] })
      ])
    );
  });

  it("rejects unknown family data at the selector boundary", () => {
    expect(() => familyNameBySlug("unknown" as never)).toThrow(
      "Unknown Rosa family slug: unknown"
    );
  });
});
