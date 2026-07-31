import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";

describe("F3B family composition", () => {
  it.each(["knives", "scissors", "punches", "chisels", "cutters"])(
    "renders the %s family with one h1 and four products",
    (familySlug) => {
      const html = renderToStaticMarkup(<FamilyListingPage familySlug={familySlug} />);
      expect((html.match(/<h1/g) || [])).toHaveLength(1);
      expect((html.match(/data-product-card=/g) || [])).toHaveLength(4);
      expect(html).not.toContain("<form");
      expect(html).not.toMatch(/price|in stock|checkout|rating|certified/i);
    }
  );
});
