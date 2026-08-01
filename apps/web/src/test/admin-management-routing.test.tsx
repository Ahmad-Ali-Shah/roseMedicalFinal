import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CATALOGUE_FAMILIES, CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  AdminManagementRouteView,
  isAdminManagementRoot,
  resolveAdminManagementRoute
} from "@/features/admin-management-routing";

describe("F3E-B management routing", () => {
  it("resolves every approved list and detail shape", () => {
    expect(resolveAdminManagementRoute(["products"]).kind).toBe("products");
    expect(resolveAdminManagementRoute(["families"]).kind).toBe("families");
    expect(resolveAdminManagementRoute(["catalogues"]).kind).toBe("catalogues");
    expect(resolveAdminManagementRoute(["media"]).kind).toBe("media");

    for (const product of CATALOGUE_PRODUCTS) {
      expect(resolveAdminManagementRoute(["products", product.familySlug, product.slug]).kind).toBe("product");
    }
    for (const family of CATALOGUE_FAMILIES) {
      expect(resolveAdminManagementRoute(["families", family.slug]).kind).toBe("family");
      expect(resolveAdminManagementRoute(["catalogues", family.slug]).kind).toBe("catalogue");
    }
  });

  it.each([
    [],
    ["products", "knives"],
    ["products", "knives", "scalpel-handle-no-3", "extra"],
    ["families", "knives", "extra"],
    ["catalogues", "knives", "extra"],
    ["media", "extra"],
    ["products", "scissors", "scalpel-handle-no-3"],
    ["unknown"]
  ])("returns not-found for unsupported shape %j", (segments) => {
    expect(resolveAdminManagementRoute(segments).kind).toBe("not-found");
  });

  it("identifies only the four F3E-B roots", () => {
    expect(["products", "families", "catalogues", "media"].every(isAdminManagementRoot)).toBe(true);
    expect(isAdminManagementRoot("inquiries")).toBe(false);
  });

  it("renders normal routes without preview-only states", () => {
    const result = resolveAdminManagementRoute(["products"]);
    const html = renderToStaticMarkup(<AdminManagementRouteView result={result} />);
    expect(html).not.toContain("data-preview-only");
    expect((html.match(/<h1/g) ?? [])).toHaveLength(1);
  });
});
