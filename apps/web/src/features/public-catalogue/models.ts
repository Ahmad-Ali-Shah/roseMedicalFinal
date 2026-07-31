import type { Route } from "next";

export const FAMILY_SLUGS = [
  "knives",
  "scissors",
  "punches",
  "chisels",
  "cutters"
] as const;

export type FamilySlug = (typeof FAMILY_SLUGS)[number];

export interface FamilyCardModel {
  id: string;
  slug: FamilySlug;
  name: string;
  description?: string;
  imageLabel: string;
}

export interface ProductPreviewModel {
  id: string;
  slug: string;
  familySlug: FamilySlug;
  familyName: string;
  name: string;
  code: string;
  description?: string;
  imageLabel: string;
}

export function familyHref(slug: FamilySlug) {
  return `/products/${slug}` as const;
}

export function productHref<TSlug extends string>(
  product: Pick<ProductPreviewModel, "familySlug"> & { slug: TSlug }
): Route<`/products/${FamilySlug}/${TSlug}`> {
  return `/products/${product.familySlug}/${product.slug}` as Route<
    `/products/${FamilySlug}/${TSlug}`
  >;
}
