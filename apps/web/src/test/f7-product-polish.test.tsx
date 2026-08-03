import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProductsOverview } from "@/features/products/products-overview";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("F7 product discovery polish", () => {
  it("stages the products overview while preserving discovery behavior", () => {
    const html = renderToStaticMarkup(<ProductsOverview />);

    expect(html).toContain('data-section="products-hero"');
    expect(html).toContain('data-motion="text-reveal"');
    expect((html.match(/data-motion="stagger"/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((html.match(/data-motion="stagger-item"/g) ?? []).length).toBeGreaterThanOrEqual(8);
    expect(html).toContain("Search by product name or code");
    expect(html).toContain('href="/search"');
    expect(html).toContain("Request a quotation");
  });

  it("keeps family results and product paths intact while adding spatial choreography", () => {
    const html = renderToStaticMarkup(<FamilyListingPage familySlug="knives" />);

    expect(html).toContain("Knives");
    expect(html).toContain("Scalpel Handle No. 3");
    expect(html).toContain('href="/products/knives/scalpel-handle-no-3"');
    expect(html).toContain('data-motion="stagger"');
    expect(html).toContain('data-motion="tilt"');
    expect(html).toContain("Loading and no-result behavior.");
  });

  it("reveals product detail in content order without changing inquiry behavior", () => {
    const html = renderToStaticMarkup(
      <ProductDetailPage familySlug="knives" productSlug="scalpel-handle-no-3" />
    );

    expect(html).toContain("Scalpel Handle No. 3");
    expect(html).toContain("18-0644");
    expect(html).toContain("Add to inquiry");
    expect(html).toContain('href="/catalogues"');
    expect((html.match(/data-motion="reveal"/g) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(html).toContain('data-motion="tilt"');
    expect(html).toContain('data-motion="stagger"');
  });

  it("morphs the add action while retaining the current storage boundary", () => {
    const button = source("src/features/inquiry/add-to-inquiry-button.tsx");

    expect(button).toContain("AnimatePresence");
    expect(button).toContain("addInquiryItem(item)");
    expect(button).toContain('href="/inquiry"');
    expect(button).toContain("Added · View inquiry");
  });

  it("does not take ownership of product binaries or mappings", () => {
    const changedSurfaces = [
      "src/features/products/sections/products-hero.tsx",
      "src/features/family-listing/family-hero.tsx",
      "src/features/family-listing/family-product-card.tsx",
      "src/features/product-detail/product-gallery.tsx"
    ].map(source).join("\n");

    expect(changedSurfaces).not.toMatch(/\.webp|\.avif|\.jpe?g|\.png|\/media\//i);
    expect(changedSurfaces).toContain("ProductMediaPlaceholder");
  });
});
