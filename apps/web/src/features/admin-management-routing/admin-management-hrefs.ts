import type { Route } from "next";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import type { FamilySlug } from "@/features/public-catalogue";

export const adminProductsHref = () => "/admin/products" as Route<string>;
export const adminFamiliesHref = () => "/admin/families" as Route<string>;
export const adminCataloguesHref = () => "/admin/catalogues" as Route<string>;

export function adminProductHref(
  product: Pick<CatalogueProductRecord, "familySlug" | "slug">
): Route<string> {
  return `/admin/products/${product.familySlug}/${product.slug}` as Route<string>;
}

export function adminFamilyHref(familySlug: FamilySlug): Route<string> {
  return `/admin/families/${familySlug}` as Route<string>;
}

export function adminCatalogueHref(familySlug: FamilySlug): Route<string> {
  return `/admin/catalogues/${familySlug}` as Route<string>;
}

export const adminNewProductHref = () => "/admin/products/new" as Route<string>;
