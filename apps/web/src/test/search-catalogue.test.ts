import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { normalizeSearchQuery, searchCatalogue } from "@/features/search/search-catalogue";

describe("catalogue search", () => {
  it("normalizes punctuation, spacing, and case", () => {
    expect(normalizeSearchQuery("  SCALPEL—Handle  ")).toBe("scalpel handle");
  });

  it("ranks an exact code before incidental matches", () => {
    const results = searchCatalogue(CATALOGUE_PRODUCTS, "18-0644");
    expect(results[0]?.code).toBe("18-0644");
  });

  it("searches names, families, sizes, variants, and directions", () => {
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "scalpel").some((item) => item.name.includes("Scalpel"))).toBe(true);
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "knives").every((item) => item.familySlug === "knives")).toBe(true);
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "14.5 cm").length).toBeGreaterThan(0);
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "curved").length).toBeGreaterThan(0);
  });

  it("returns no products for a blank query or unmatched phrase", () => {
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "  ")).toEqual([]);
    expect(searchCatalogue(CATALOGUE_PRODUCTS, "unlisted imaginary instrument")).toEqual([]);
  });
});
