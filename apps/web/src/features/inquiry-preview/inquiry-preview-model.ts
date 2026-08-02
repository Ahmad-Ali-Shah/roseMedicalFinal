import {
  getProductDetailModel,
  type CatalogueProductRecord
} from "@/features/catalogue-registry";

export interface InquiryPreviewLine {
  id: string;
  product: CatalogueProductRecord;
  quantity: number;
  size?: string;
  variant?: string;
  note?: string;
}

export interface InquiryPreviewTotals {
  uniqueProducts: number;
  totalQuantity: number;
}

function requireProduct(
  familySlug: string,
  productSlug: string
): CatalogueProductRecord {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") {
    throw new Error(`Missing inquiry preview product: ${familySlug}/${productSlug}`);
  }
  return result.product;
}

function createPreviewLine({
  familySlug,
  productSlug,
  quantity
}: {
  familySlug: string;
  productSlug: string;
  quantity: number;
}): InquiryPreviewLine {
  const product = requireProduct(familySlug, productSlug);
  const size = product.sizes[0];
  const variant = product.variants[0] ?? product.directions[0];

  return {
    id: `inquiry_${product.id}`,
    product,
    quantity,
    ...(size ? { size } : {}),
    ...(variant ? { variant } : {})
  };
}

export const INQUIRY_PREVIEW_LINES = [
  createPreviewLine({
    familySlug: "knives",
    productSlug: "scalpel-handle-no-3",
    quantity: 2
  }),
  createPreviewLine({
    familySlug: "scissors",
    productSlug: "mayo-scissors",
    quantity: 4
  }),
  createPreviewLine({
    familySlug: "knives",
    productSlug: "amputation-knife",
    quantity: 2
  })
] as const satisfies readonly InquiryPreviewLine[];

export function getInquiryPreviewTotals(
  lines: readonly InquiryPreviewLine[] = INQUIRY_PREVIEW_LINES
): InquiryPreviewTotals {
  return {
    uniqueProducts: lines.length,
    totalQuantity: lines.reduce((total, line) => total + line.quantity, 0)
  };
}
