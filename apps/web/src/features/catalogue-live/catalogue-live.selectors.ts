import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { FAMILY_SLUGS, type FamilySlug } from "@/features/public-catalogue/models";

function isFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

export function getFamilyProducts(
  products: readonly CatalogueProductRecord[],
  familySlug: string
): readonly CatalogueProductRecord[] {
  if (!isFamilySlug(familySlug)) return [];
  return products.filter((product) => product.familySlug === familySlug);
}

export function getProductByPublicRoute(
  products: readonly CatalogueProductRecord[],
  familySlug: string,
  productSlug: string
): CatalogueProductRecord | null {
  if (!isFamilySlug(familySlug)) return null;
  return (
    products.find(
      (product) =>
        product.familySlug === familySlug && product.slug === productSlug
    ) ?? null
  );
}

export function getRelatedProductsFromCatalogue(
  products: readonly CatalogueProductRecord[],
  product: Pick<CatalogueProductRecord, "familySlug" | "slug">,
  limit: number
): readonly CatalogueProductRecord[] {
  if (limit <= 0) return [];
  return products
    .filter(
      (candidate) =>
        candidate.familySlug === product.familySlug &&
        candidate.slug !== product.slug
    )
    .slice(0, limit);
}
