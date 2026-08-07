import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  createLegacyQuotationHash,
  type QuotationPayload
} from "@/features/inquiry/quotation-payload";

const LEGACY_PRODUCT_ID_BY_ROUTE = new Map(
  CATALOGUE_PRODUCTS.map((product) => [
    `${product.familySlug}/${product.slug}`,
    product.id
  ] as const)
);

export function createLegacyStaticQuotationHash(
  payload: QuotationPayload
): string | null {
  const items = payload.items.map((item) => {
    const legacyId = LEGACY_PRODUCT_ID_BY_ROUTE.get(
      `${item.familySlug}/${item.slug}`
    );
    return legacyId ? { ...item, id: legacyId } : null;
  });

  if (items.some((item) => item === null)) return null;

  return createLegacyQuotationHash({
    ...payload,
    items: items as QuotationPayload["items"]
  });
}
