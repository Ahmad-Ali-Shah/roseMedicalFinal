import { describe, expect, it } from "vitest";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { resolveAdminManagementRoute } from "@/features/admin-management-routing/admin-management-route-model";
import {
  getAdminProductEditor,
  getAdminProductRows
} from "@/features/admin-products/admin-product-model";

const product: CatalogueProductRecord = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  familySlug: "cutters",
  slug: "liston",
  name: "Liston",
  code: "36-5101",
  description: "Live canonical description",
  sizes: ["14.0 cm", "17.0 cm"],
  variants: [],
  directions: ["Straight"],
  primaryOption: "Straight",
  catalogueReference: { family: "Cutters", page: "1" },
  mediaLabel: "Liston, Straight",
  mediaPath: "https://rosa.supabase.co/storage/v1/object/public/product-media/products/example/liston.webp"
};

describe("canonical Product Admin models", () => {
  it("classifies product editor routes from the approved route manifest", () => {
    expect(resolveAdminManagementRoute(["products", "cutters", "liston"])).toEqual({
      kind: "product",
      familySlug: "cutters",
      productSlug: "liston"
    });
    expect(
      resolveAdminManagementRoute(["products", "cutters", "not-a-real-product"])
    ).toEqual({ kind: "product", familySlug: "cutters", productSlug: "not-a-real-product" });
  });

  it("builds list rows from canonical product media and documented options", () => {
    expect(getAdminProductRows([product])).toEqual([
      expect.objectContaining({
        id: product.id,
        name: "Liston",
        code: "36-5101",
        familyName: "Cutters",
        optionSummary: ["14.0 cm", "17.0 cm", "Straight"],
        catalogueReference: "Cutters · Page 1",
        mediaPath: product.mediaPath,
        publicHref: "/products/cutters/liston",
        adminHref: "/admin/products/cutters/liston"
      })
    ]);
  });

  it("builds editor data from the same canonical product object", () => {
    const editor = getAdminProductEditor(product);
    expect(editor?.product).toBe(product);
    expect(editor?.publicHref).toBe("/products/cutters/liston");
    expect(editor?.completeness).toContainEqual({
      key: "media",
      label: "Primary product media",
      state: "Present"
    });
  });
});
