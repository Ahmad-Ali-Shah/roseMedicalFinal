import { getFamilyListingModel } from "@/features/catalogue-registry";

export function createFamilyListingData(familySlug: string) {
  const result = getFamilyListingModel(familySlug);
  if (result.kind !== "family") return null;

  return {
    family: result.family,
    products: result.products,
    countLabel: `${result.products.length} products`,
    searchLabel: `Search within ${result.family.name}`
  } as const;
}
