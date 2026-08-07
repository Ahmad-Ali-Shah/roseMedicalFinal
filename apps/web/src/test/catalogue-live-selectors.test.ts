import { describe, expect, it } from "vitest";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import {
  getFamilyProducts,
  getProductByPublicRoute,
  getRelatedProductsFromCatalogue
} from "@/features/catalogue-live";

const products: readonly CatalogueProductRecord[] = [
  {
    id: "db-liston",
    familySlug: "cutters",
    slug: "liston",
    name: "Liston",
    code: "36-5101",
    sizes: ["14.0 cm"],
    variants: [],
    directions: ["Straight"],
    catalogueReference: { family: "Cutters", page: "1" },
    mediaLabel: "Liston",
    mediaPath: "/media/liston.avif"
  },
  {
    id: "db-cleveland",
    familySlug: "cutters",
    slug: "cleveland",
    name: "Cleveland",
    code: "36-5401",
    sizes: ["14.0 cm"],
    variants: [],
    directions: ["Straight"],
    catalogueReference: { family: "Cutters", page: "2" },
    mediaLabel: "Cleveland",
    mediaPath: "/media/cleveland.avif"
  },
  {
    id: "db-round",
    familySlug: "knives",
    slug: "round-straight",
    name: "Round Scalpel Handle",
    code: "18-0644",
    sizes: ["13.0 cm"],
    variants: ["Round"],
    directions: ["Straight"],
    catalogueReference: { family: "Knives", page: "4" },
    mediaLabel: "Round Scalpel Handle",
    mediaPath: "/media/round.avif"
  },
  {
    id: "db-no3",
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    name: "Scalpel Handle No. 3",
    code: "18-0644",
    sizes: ["14.5 cm"],
    variants: ["No. 3"],
    directions: [],
    catalogueReference: { family: "Knives", page: "6" },
    mediaLabel: "Scalpel Handle No. 3",
    mediaPath: "/media/no3.avif"
  }
];

describe("canonical catalogue selectors", () => {
  it("returns only the injected family products in canonical order", () => {
    expect(getFamilyProducts(products, "cutters").map((product) => product.id)).toEqual([
      "db-liston",
      "db-cleveland"
    ]);
    expect(getFamilyProducts(products, "not-a-family")).toEqual([]);
  });

  it("resolves exact public route identity rather than item code", () => {
    expect(getProductByPublicRoute(products, "knives", "round-straight")?.id).toBe(
      "db-round"
    );
    expect(
      getProductByPublicRoute(products, "knives", "scalpel-handle-no-3")?.id
    ).toBe("db-no3");
    expect(getProductByPublicRoute(products, "knives", "missing")).toBeNull();
  });

  it("returns deterministic same-family related products and excludes current route", () => {
    expect(
      getRelatedProductsFromCatalogue(products, products[0]!, 3).map(
        (product) => product.slug
      )
    ).toEqual(["cleveland"]);
    expect(getRelatedProductsFromCatalogue(products, products[0]!, 0)).toEqual([]);
  });
});
