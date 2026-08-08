import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";
import { renderServerComponent } from "@/test/render-server-component";

const FAMILY_SLUGS = [
  "knives",
  "scissors",
  "punches",
  "chisels",
  "cutters"
] as const;

describe("F3B family composition", () => {
  it.each(FAMILY_SLUGS)(
    "renders the complete %s family inventory with one h1",
    async (familySlug) => {
      const html = await renderServerComponent(<FamilyListingPage familySlug={familySlug} />);
      const expectedCount = CATALOGUE_PRODUCTS.filter(
        (product) => product.familySlug === familySlug
      ).length;

      expect((html.match(/<h1/g) || [])).toHaveLength(1);
      expect((html.match(/data-product-card=/g) || [])).toHaveLength(expectedCount);
      expect(html).not.toContain("<form");
      expect(html).not.toMatch(/\bin stock\b|\bcheckout\b|\brating\b|\bcertified\b/i);
    }
  );
});

describe("F3B product composition", () => {
  it("renders specifications and related products without false success", async () => {
    const html = await renderServerComponent(
      <ProductDetailPage familySlug="knives" productSlug="scalpel-handle-no-3" />
    );
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    expect(html).toContain("18-0644");
    expect(html).toContain("<table");
    expect(html).toContain("More from Knives");
    expect(html).not.toContain("Added to your inquiry");
  });

  it("omits unsupported specification rows", async () => {
    const html = await renderServerComponent(
      <ProductDetailPage familySlug="cutters" productSlug="cleveland" />
    );
    expect(html).not.toContain("Direction / shape</th><td></td>");
  });

  it("returns null for invalid combinations", async () => {
    await expect(
      ProductDetailPage({ familySlug: "scissors", productSlug: "scalpel-handle-no-3" })
    ).resolves.toBeNull();
  });
});
