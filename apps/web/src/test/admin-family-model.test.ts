import { describe, expect, it } from "vitest";
import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS
} from "@/features/catalogue-registry";
import {
  getAdminFamilyEditor,
  getAdminFamilyRows
} from "@/features/admin-families";

describe("F3E-B family selectors", () => {
  it("derives all families and product counts from source", () => {
    const rows = getAdminFamilyRows();
    expect(rows).toHaveLength(CATALOGUE_FAMILIES.length);
    expect(rows.reduce((sum, row) => sum + row.productCount, 0)).toBe(CATALOGUE_PRODUCTS.length);
    for (const row of rows) {
      expect(row.productCount).toBe(
        CATALOGUE_PRODUCTS.filter((product) => product.familySlug === row.slug).length
      );
    }
  });

  it("resolves every known family editor and no unknown family", () => {
    for (const family of CATALOGUE_FAMILIES) {
      const editor = getAdminFamilyEditor(family.slug);
      expect(editor?.family.slug).toBe(family.slug);
      expect(editor?.products).toHaveLength(
        CATALOGUE_PRODUCTS.filter((product) => product.familySlug === family.slug).length
      );
    }
    expect(getAdminFamilyEditor("unknown")).toBeUndefined();
  });
});
