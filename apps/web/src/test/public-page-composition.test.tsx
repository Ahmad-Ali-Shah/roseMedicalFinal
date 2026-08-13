import { describe, expect, it } from "vitest";
import { PublicShell } from "@/components/layout/public-shell";
import { Homepage } from "@/features/homepage/homepage";
import { ProductsOverview } from "@/features/products/products-overview";
import { renderServerComponent } from "@/test/render-server-component";

describe("Rosa homepage composition", () => {
  it("renders one shell main, one h1 and all approved compact sections", async () => {
    const html = await renderServerComponent(<PublicShell><Homepage /></PublicShell>);
    expect((html.match(/<main/g) || [])).toHaveLength(1);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    for (const marker of [
      "home-hero",
      "family-discovery",
      "comprehensive-plans",
      "securing-confidence",
      "home-contact-band",
      "client-success-assurance",
      "quotation-cta",
      "home-social-strip"
    ]) expect(html).toContain(`data-section="${marker}"`);
  });

  it("shows five families and the client-approved trust/service content without commerce", async () => {
    const html = await renderServerComponent(<Homepage />);
    for (const family of ["Knives", "Scissors", "Punches", "Chisels", "Cutters"]) {
      expect(html).toContain(family);
    }
    for (const content of [
      "Comprehensive Plans",
      "Securing Confidence",
      "ISO",
      "SFDA",
      "Customization",
      "Compliance",
      "Quality Standards",
      "Supply Chain"
    ]) {
      expect(html).toContain(content);
    }
    expect(html).not.toMatch(/price|in stock|rating|checkout|pay now|add to cart/i);
    expect(html).not.toMatch(/youtube/i);
  });
});

describe("Rosa products overview composition", () => {
  it("renders one shell main, one h1 and all approved products sections", async () => {
    const html = await renderServerComponent(<PublicShell><ProductsOverview /></PublicShell>);
    expect((html.match(/<main/g) || [])).toHaveLength(1);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    for (const marker of [
      "products-hero",
      "discovery-toolbar",
      "family-index",
      "product-preview-grid",
      "catalogue-support",
      "products-procurement-cta"
    ]) expect(html).toContain(`data-section="${marker}"`);
  });

  it("uses search navigation rather than a deceptive static form", async () => {
    const html = await renderServerComponent(<ProductsOverview />);
    expect(html).not.toContain("<form");
    expect(html).toContain('href="/search"');
    expect(html).toContain('href="/inquiry"');
  });
});
