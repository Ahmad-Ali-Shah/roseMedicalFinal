import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PublicShell } from "@/components/layout/public-shell";
import { Homepage } from "@/features/homepage/homepage";

describe("Rosa homepage composition", () => {
  it("renders one shell main, one h1 and all approved sections", () => {
    const html = renderToStaticMarkup(<PublicShell><Homepage /></PublicShell>);
    expect((html.match(/<main/g) || [])).toHaveLength(1);
    expect((html.match(/<h1/g) || [])).toHaveLength(1);
    for (const marker of [
      "home-hero",
      "family-discovery",
      "procurement-support",
      "featured-instruments",
      "catalogue-access",
      "quotation-cta"
    ]) expect(html).toContain(`data-section="${marker}"`);
  });

  it("shows five families and representative products without prohibited claims or commerce", () => {
    const html = renderToStaticMarkup(<Homepage />);
    for (const family of ["Knives", "Scissors", "Punches", "Chisels", "Cutters"]) {
      expect(html).toContain(family);
    }
    for (const code of ["18-0644", "04-0402", "23-1204"]) {
      expect(html).toContain(code);
    }
    expect(html).not.toMatch(/price|in stock|rating|checkout|certified|years of experience|trusted by/i);
  });
});
