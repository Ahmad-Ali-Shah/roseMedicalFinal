import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry/families";
import { getFamilyProducts } from "@/features/catalogue-live";

export function createFamilyListingData(
  familySlug: string,
  products: readonly CatalogueProductRecord[]
) {
  const family = CATALOGUE_FAMILIES.find(
    (candidate) => candidate.slug === familySlug
  );
  if (!family) return null;

  const familyProducts = getFamilyProducts(products, familySlug);

  return {
    family,
    products: familyProducts,
    countLabel: `${familyProducts.length} products`,
    searchLabel: `Search within ${family.name}`
  } as const;
}
