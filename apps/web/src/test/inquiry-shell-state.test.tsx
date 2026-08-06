import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InquiryCountLabel } from "@/features/inquiry/inquiry-count";
import { FamilyProductCard } from "@/features/family-listing/family-product-card";
import { getFamilyListingModel } from "@/features/catalogue-registry";

describe("public inquiry entry points", () => {
  it("renders a hydration-stable inquiry count", () => {
    expect(renderToStaticMarkup(<InquiryCountLabel />)).toContain("Inquiry (0)");
  });

  it("offers a real add action on family product cards", () => {
    const listing = getFamilyListingModel("knives");
    expect(listing.kind).toBe("family");
    if (listing.kind !== "family") throw new Error("Expected knives listing");
    const product = listing.products[0];
    expect(product).toBeDefined();
    const html = renderToStaticMarkup(
      <FamilyProductCard family={listing.family} product={product!} />
    );

    expect(html).toContain("Add to inquiry");
    expect(html).not.toContain("available next phase");
  });
});
