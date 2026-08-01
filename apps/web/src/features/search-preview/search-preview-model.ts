import {
  getProductDetailModel,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";

function requireSearchProduct(
  familySlug: string,
  productSlug: string
): CatalogueProductRecord {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") {
    throw new Error(`Missing search preview product: ${familySlug}/${productSlug}`);
  }
  return result.product;
}

export const SEARCH_PREVIEW_QUERY = "scalpel";

export const SEARCH_PREVIEW_RESULTS = [
  requireSearchProduct("knives", "scalpel-handle-no-3"),
  requireSearchProduct("knives", "bard-parker-handle")
] as const satisfies readonly CatalogueProductRecord[];
