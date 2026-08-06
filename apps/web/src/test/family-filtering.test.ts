import { describe, expect, it } from "vitest";
import { getFamilyListingModel } from "@/features/catalogue-registry";
import { filterFamilyProducts } from "@/features/family-listing/filter-family-products";

const listing = getFamilyListingModel("knives");
if (listing.kind !== "family") throw new Error("Expected knives family");

describe("family product filtering", () => {
  it("filters by product name and exact catalogue code", () => {
    expect(filterFamilyProducts(listing.products, { query: "scalpel" }).some((item) => item.name.includes("Scalpel"))).toBe(true);
    const byCode = filterFamilyProducts(listing.products, { query: "18-0644" });
    expect(byCode.length).toBeGreaterThan(0);
    expect(byCode.every((item) => item.code === "18-0644")).toBe(true);
  });

  it("combines documented option filters", () => {
    const result = filterFamilyProducts(listing.products, { size: "14.5 cm", variant: "Standard" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((item) => item.sizes.includes("14.5 cm") && item.variants.includes("Standard"))).toBe(true);
  });

  it("sorts by name or code without mutating registry order", () => {
    const original = [...listing.products];
    const byName = filterFamilyProducts(listing.products, { sort: "name" });
    expect(byName.map((item) => item.name)).toEqual([...byName].map((item) => item.name).sort((a, b) => a.localeCompare(b)));
    expect(listing.products).toEqual(original);
  });
});
