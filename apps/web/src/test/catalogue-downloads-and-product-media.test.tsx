import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_DOCUMENTS } from "@/features/catalogues";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  ProductPreviewCard,
  selectFeaturedProducts
} from "@/features/public-catalogue";

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8");

describe("owner catalogue downloads and complete product media", () => {
  it("publishes all five owner-supplied catalogue PDFs", () => {
    expect(CATALOGUE_DOCUMENTS).toHaveLength(5);

    for (const document of CATALOGUE_DOCUMENTS) {
      const expectedPath =
        `/media/catalogues/pdf/rosa-${document.familySlug}-catalogue.pdf`;

      expect(document.pdfPath).toBe(expectedPath);
      expect(existsSync(join(process.cwd(), "public", expectedPath.slice(1)))).toBe(
        true
      );
    }
  });

  it("resolves real registry media into every representative product card", () => {
    const featured = selectFeaturedProducts(CATALOGUE_PRODUCTS);

    expect(featured).toHaveLength(3);
    for (const product of featured) {
      expect(product).toHaveProperty("mediaPath");

      const html = renderToStaticMarkup(
        <ProductPreviewCard product={product} featured />
      );
      expect(html).toContain("product-media-placeholder--image");
    }
  });

  it("eliminates every remaining primary product-image placeholder", () => {
    const missing = CATALOGUE_PRODUCTS.filter((product) => !product.mediaPath);

    expect(missing.map((product) => product.id)).toEqual([]);
  });

  it("uses one image-backed Rosa brand in desktop and mobile navigation", () => {
    const shell = source("src/components/layout/public-shell.tsx");
    const mobile = source("src/components/layout/mobile-navigation.tsx");
    const brandPath = join(
      process.cwd(),
      "src/components/layout/public-brand-mark.tsx"
    );

    expect(existsSync(brandPath)).toBe(true);
    expect(
      existsSync(join(process.cwd(), "public/media/brand/rosa-header-logo.png"))
    ).toBe(true);
    expect(shell).toContain("<PublicBrandMark");
    expect(mobile).toContain("<PublicBrandMark");
    expect(mobile).not.toContain(">ROSA</Link>");
  });
});
