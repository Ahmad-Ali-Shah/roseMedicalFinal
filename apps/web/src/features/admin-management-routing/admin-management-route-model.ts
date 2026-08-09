import {
  getFamilyListingModel,
  type CatalogueFamilyRecord,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";
import {
  getCatalogueDocument,
  type CatalogueDocument
} from "@/features/catalogues";
import { FAMILY_SLUGS, type FamilySlug } from "@/features/public-catalogue/models";

export const ADMIN_MANAGEMENT_ROOTS = [
  "products",
  "families",
  "catalogues",
  "media"
] as const;
export type AdminManagementRoot = (typeof ADMIN_MANAGEMENT_ROOTS)[number];

export type AdminManagementRouteResult =
  | { kind: "products" }
  | { kind: "new-product" }
  | { kind: "product"; familySlug: string; productSlug: string }
  | { kind: "families" }
  | { kind: "family"; family: CatalogueFamilyRecord; products: readonly CatalogueProductRecord[] }
  | { kind: "catalogues" }
  | { kind: "catalogue"; family: CatalogueFamilyRecord; document: CatalogueDocument }
  | { kind: "media" }
  | { kind: "not-found" };

export function isAdminManagementRoot(value: string): value is AdminManagementRoot {
  return (ADMIN_MANAGEMENT_ROOTS as readonly string[]).includes(value);
}

function isFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

export function resolveAdminManagementRoute(
  segments: readonly string[]
): AdminManagementRouteResult {
  if (segments.length === 1 && segments[0] === "products") {
    return { kind: "products" };
  }

  if (segments.length === 2 && segments[0] === "products" && segments[1] === "new") {
    return { kind: "new-product" };
  }

  if (segments.length === 3 && segments[0] === "products") {
    const familySlug = segments[1] ?? "";
    const productSlug = segments[2] ?? "";
    // Route shape is validated here only (real family slug, non-empty product
    // slug). Whether the product actually exists — legacy manifest product OR
    // live-only admin-created product — is resolved by the page itself via
    // the live Supabase read, so this must not require a manifest entry
    // (a strict manifest check would 404 a freshly created draft product's
    // editor page before it's ever added to the manifest).
    return isFamilySlug(familySlug) && productSlug.trim().length > 0
      ? { kind: "product", familySlug, productSlug }
      : { kind: "not-found" };
  }

  if (segments.length === 1 && segments[0] === "families") {
    return { kind: "families" };
  }
  if (segments.length === 2 && segments[0] === "families") {
    const result = getFamilyListingModel(segments[1] ?? "");
    return result.kind === "family"
      ? { kind: "family", family: result.family, products: result.products }
      : { kind: "not-found" };
  }
  if (segments.length === 1 && segments[0] === "catalogues") {
    return { kind: "catalogues" };
  }
  if (segments.length === 2 && segments[0] === "catalogues") {
    const familyResult = getFamilyListingModel(segments[1] ?? "");
    const document = getCatalogueDocument(segments[1] ?? "");
    return familyResult.kind === "family" && document
      ? { kind: "catalogue", family: familyResult.family, document }
      : { kind: "not-found" };
  }
  if (segments.length === 1 && segments[0] === "media") {
    return { kind: "media" };
  }
  return { kind: "not-found" };
}
