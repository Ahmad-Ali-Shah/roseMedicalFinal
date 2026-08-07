import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
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

  it("maps all five family cards in the owner-approved visual order with media", () => {
    const cards = selectFamilyCards();

    expect(cards.map((family) => family.slug)).toEqual([
      "knives",
      "scissors",
      "cutters",
      "chisels",
      "punches"
    ]);
    expect(cards.map((family) => family.sequence)).toEqual(["01", "02", "03", "04", "05"]);
    expect(cards).toHaveLength(5);
    expect(cards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slug: "knives",
          media: expect.objectContaining({ src: "/media/families/knives-family.jpg" })
        }),
        expect.objectContaining({
          slug: "punches",
          media: expect.objectContaining({ src: "/media/families/punches-family.webp", fit: "contain" })
        })
      ])
    );
  });

  it("hydrates shared product cards from the supplied canonical catalogue", () => {
    const featured = selectFeaturedProducts(CATALOGUE_PRODUCTS);

    expect(featured).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "18-0644", familyName: "Knives" }),
        expect.objectContaining({ code: "04-0401", familyName: "Scissors" }),
        expect.objectContaining({ code: "23-1204", familyName: "Punches" })
      ])
    );
    expect(featured.every((product) => Boolean(product.mediaPath))).toBe(true);
  });

  it("rejects unknown family data at the selector boundary", () => {
    expect(() => familyNameBySlug("unknown" as never)).toThrow(
      "Unknown Rosa family slug: unknown"
    );
  });
});
