import { describe, expect, it } from "vitest";
import {
  adminCatalogueHref,
  adminCataloguesHref,
  adminFamiliesHref,
  adminFamilyHref,
  adminMediaHref,
  adminProductHref,
  adminProductsHref
} from "@/features/admin-management-routing";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";

describe("F3E-B admin management hrefs", () => {
  it("builds the exact approved list routes", () => {
    expect(adminProductsHref()).toBe("/admin/products");
    expect(adminFamiliesHref()).toBe("/admin/families");
    expect(adminCataloguesHref()).toBe("/admin/catalogues");
    expect(adminMediaHref()).toBe("/admin/media");
  });

  it("builds source-backed detail routes", () => {
    const product = CATALOGUE_PRODUCTS[0]!;
    expect(adminProductHref(product)).toBe(
      `/admin/products/${product.familySlug}/${product.slug}`
    );
    expect(adminFamilyHref(product.familySlug)).toBe(
      `/admin/families/${product.familySlug}`
    );
    expect(adminCatalogueHref(product.familySlug)).toBe(
      `/admin/catalogues/${product.familySlug}`
    );
  });
});
