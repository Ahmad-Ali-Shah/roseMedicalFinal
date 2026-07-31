import { FAMILY_SLUGS, type FamilySlug } from "@/features/public-catalogue";
import { CATALOGUE_FAMILIES } from "./families";
import { CATALOGUE_PRODUCTS } from "./products";
import type {
  CatalogueProductRecord,
  CatalogueRouteResult
} from "./types";

const familyBySlug = new Map(
  CATALOGUE_FAMILIES.map((family) => [family.slug, family] as const)
);

const productByRoute = new Map(
  CATALOGUE_PRODUCTS.map((product) => [
    `${product.familySlug}/${product.slug}`,
    product
  ] as const)
);

function assertRegistryIntegrity(): void {
  const ids = new Set<string>();

  for (const product of CATALOGUE_PRODUCTS) {
    if (!familyBySlug.has(product.familySlug)) {
      throw new Error(`Unknown catalogue family: ${product.familySlug}`);
    }
    if (!product.name.trim()) {
      throw new Error(`Missing product name: ${product.id}`);
    }
    if (!product.code.trim()) {
      throw new Error(`Missing product code: ${product.id}`);
    }
    if (ids.has(product.id)) {
      throw new Error(`Duplicate product id: ${product.id}`);
    }
    ids.add(product.id);
  }

  if (productByRoute.size !== CATALOGUE_PRODUCTS.length) {
    throw new Error("Duplicate catalogue product route");
  }
}

assertRegistryIntegrity();

export function isKnownFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

export function getRelatedProducts(
  productId: string,
  limit: number
): readonly CatalogueProductRecord[] {
  const product = CATALOGUE_PRODUCTS.find((candidate) => candidate.id === productId);
  if (!product || limit <= 0) return [];

  return CATALOGUE_PRODUCTS.filter(
    (candidate) =>
      candidate.familySlug === product.familySlug && candidate.id !== product.id
  ).slice(0, limit);
}

export function getFamilyListingModel(familySlug: string): CatalogueRouteResult {
  if (!isKnownFamilySlug(familySlug)) return { kind: "not-found" };

  const family = familyBySlug.get(familySlug);
  if (!family) return { kind: "not-found" };

  return {
    kind: "family",
    family,
    products: CATALOGUE_PRODUCTS.filter(
      (product) => product.familySlug === familySlug
    )
  };
}

export function getProductDetailModel(
  familySlug: string,
  productSlug: string
): CatalogueRouteResult {
  if (!isKnownFamilySlug(familySlug)) return { kind: "not-found" };

  const family = familyBySlug.get(familySlug);
  const product = productByRoute.get(`${familySlug}/${productSlug}`);
  if (!family || !product) return { kind: "not-found" };

  return {
    kind: "product",
    family,
    product,
    related: getRelatedProducts(product.id, 3)
  };
}

export function resolveCataloguePath(
  segments: readonly string[]
): CatalogueRouteResult {
  if (segments[0] !== "products") return { kind: "not-found" };
  if (segments.length === 2) return getFamilyListingModel(segments[1] ?? "");
  if (segments.length === 3) {
    return getProductDetailModel(segments[1] ?? "", segments[2] ?? "");
  }
  return { kind: "not-found" };
}
