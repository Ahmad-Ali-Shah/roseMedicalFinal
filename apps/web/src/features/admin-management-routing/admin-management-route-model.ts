import {
  getFamilyListingModel,
  type CatalogueFamilyRecord,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";
import { CATALOGUE_METADATA_MANIFEST } from "@/features/catalogue-migration/catalogue-metadata-manifest";
import {
  getCatalogueDocument,
  type CatalogueDocument
} from "@/features/catalogues";

export const ADMIN_MANAGEMENT_ROOTS = [
  "products",
  "families",
  "catalogues",
  "media"
] as const;

export type AdminManagementRoot = (typeof ADMIN_MANAGEMENT_ROOTS)[number];

export type AdminManagementRouteResult =
  | { kind: "products" }
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

function isKnownProductRoute(familySlug: string, productSlug: string): boolean {
  return CATALOGUE_METADATA_MANIFEST.some(
    (entry) =>
      entry.familySlug === familySlug && entry.publicSlug === productSlug
  );
}

export function resolveAdminManagementRoute(
  segments: readonly string[]
): AdminManagementRouteResult {
  if (segments.length === 1 && segments[0] === "products") {
    return { kind: "products" };
  }

  if (segments.length === 3 && segments[0] === "products") {
    const familySlug = segments[1] ?? "";
    const productSlug = segments[2] ?? "";
    return isKnownProductRoute(familySlug, productSlug)
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
