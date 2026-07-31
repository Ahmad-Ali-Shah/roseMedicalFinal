import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FamilyCard,
  ProductMediaPlaceholder,
  ProductPreviewCard,
  SectionHeading
} from "@/features/public-catalogue";

const family = {
  id: "family_knives",
  slug: "knives" as const,
  name: "Knives",
  description: "Precision cutting instruments organised for professional inquiry.",
  imageLabel: "Knives instrument placeholder"
};

const product = {
  id: "product_scalpel_handle_3",
  slug: "scalpel-handle-no-3",
  familySlug: "knives" as const,
  familyName: "Knives",
  name: "Scalpel Handle No. 3",
  code: "18-0644",
  description: "Reusable surgical instrument handle presented for quotation review.",
  imageLabel: "Scalpel handle placeholder"
};

describe("public catalogue components", () => {
  it("renders caller-controlled semantic headings", () => {
    const html = renderToStaticMarkup(
      <SectionHeading level={2} title="Instrument families" copy="Browse by family." />
    );
    expect(html).toContain("<h2");
    expect(html).toContain("Instrument families");
  });

  it("renders family and product cards without commerce language", () => {
    const html = renderToStaticMarkup(
      <><FamilyCard family={family} /><ProductPreviewCard product={product} /></>
    );
    expect(html).toContain("/products/knives");
    expect(html).toContain("18-0644");
    expect(html).not.toMatch(/price|stock|rating|buy now/i);
  });

  it("hides decorative media from assistive technology", () => {
    const html = renderToStaticMarkup(
      <ProductMediaPlaceholder label="Decorative instrument marker" decorative />
    );
    expect(html).toContain('aria-hidden="true"');
  });
});
