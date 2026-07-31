import { getProductDetailModel } from "@/features/catalogue-registry";

export type ProductSpecificationRow = readonly [label: string, value: string];

export function createProductDetailData(
  familySlug: string,
  productSlug: string
) {
  const result = getProductDetailModel(familySlug, productSlug);
  if (result.kind !== "product") return null;

  const { family, product, related } = result;
  const catalogueReference = `${product.catalogueReference.family}${
    product.catalogueReference.page
      ? ` · Page ${product.catalogueReference.page}`
      : ""
  }`;

  const specifications = [
    ["Product code", product.code],
    ["Instrument family", family.name],
    product.sizes.length
      ? ["Available size", product.sizes.join(", ")]
      : null,
    product.variants.length
      ? ["Listed options", product.variants.join(", ")]
      : null,
    product.directions.length
      ? ["Direction / shape", product.directions.join(", ")]
      : null,
    ["Catalogue reference", catalogueReference]
  ].filter((row): row is ProductSpecificationRow => Boolean(row));

  return {
    family,
    product,
    related,
    catalogueReference,
    specifications,
    sizeValue: product.sizes[0] ?? product.primaryOption ?? "As listed",
    variantValue:
      product.variants[0] ?? product.directions[0] ?? "As listed"
  } as const;
}
