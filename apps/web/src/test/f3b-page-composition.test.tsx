import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";

describe("F3B family composition", () => {
  it.each(["knives", "scissors", "punches", "chisels", "cutters"])(
    "renders the %s family with one h1 and four products",
    (familySlug) => {
      const html = renderToStaticMarkup(<FamilyListingPage familySlug={familySlug} />);
      expect((html.match(/<h1/g) || [])).toHaveLength(1);
      expect((html.match(/data-product-card=/g) || [])).toHaveLength(4);
      expect(html).not.toContain("<form");
      expect(html).not.toMatch(/in stock|checkout|rating|certified/i);
    }
  );
});

describe("F3B product composition", () => {
  it("renders specifications and related products without false success", () => {
    const html = renderToStaticMarkup(
      <ProductDetailPage familySlug="knives" productSlug="scalpel-handle-no-3" />
    );
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    expect(html).toContain("18-0644");
    expect(html).toContain("<table");
    expect(html).toContain("More from Knives");
    expect(html).not.toContain("Added to your inquiry");
  });

  it("omits unsupported specification rows", () => {
    const html = renderToStaticMarkup(
      <ProductDetailPage familySlug="cutters" productSlug="cleveland" />
    );
    expect(html).not.toContain("Direction / shape</th><td></td>");
  });

  it("returns null for invalid combinations", () => {
    expect(ProductDetailPage({ familySlug: "scissors", productSlug: "scalpel-handle-no-3" })).toBeNull();
  });
});
