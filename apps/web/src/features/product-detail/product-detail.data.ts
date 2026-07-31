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

  const specifications: ProductSpecificationRow[] = [
    ["Product code", product.code],
    ["Instrument family", family.name]
  ];

  if (product.sizes.length) {
    specifications.push(["Available size", product.sizes.join(", ")]);
  }
  if (product.variants.length) {
    specifications.push(["Listed options", product.variants.join(", ")]);
  }
  if (product.directions.length) {
    specifications.push(["Direction / shape", product.directions.join(", ")]);
  }
  specifications.push(["Catalogue reference", catalogueReference]);

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
