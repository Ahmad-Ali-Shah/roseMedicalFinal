import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import type { InquiryItem } from "./inquiry-store";

export function createInquiryItemFromProduct(
  product: CatalogueProductRecord,
  overrides: Partial<Pick<InquiryItem, "size" | "variant" | "quantity" | "notes">> = {}
): InquiryItem {
  return {
    id: product.id,
    familySlug: product.familySlug,
    slug: product.slug,
    name: product.name,
    code: product.code,
    size: overrides.size ?? product.sizes[0] ?? "Standard",
    variant:
      overrides.variant ??
      product.primaryOption ??
      product.variants[0] ??
      product.directions[0] ??
      "Standard",
    quantity: overrides.quantity ?? 1,
    notes: overrides.notes ?? ""
  };
}
