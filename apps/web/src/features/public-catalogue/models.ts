import type { Route } from "next";

export const FAMILY_SLUGS = [
  "knives",
  "scissors",
  "punches",
  "chisels",
  "cutters"
] as const;

export const FAMILY_CARD_DISPLAY_ORDER = [
  "knives",
  "scissors",
  "cutters",
  "chisels",
  "punches"
] as const satisfies readonly FamilySlug[];

export type FamilySlug = (typeof FAMILY_SLUGS)[number];

export interface PublicMediaModel {
  src: string;
  alt: string;
  altAr?: string;
  focalPoint: string;
  fit: "cover" | "contain";
}

export interface FamilyCardModel {
  id: string;
  slug: FamilySlug;
  name: string;
  sequence: string;
  description?: string;
  imageLabel: string;
  media: PublicMediaModel;
}

export interface ProductPreviewModel {
  id: string;
  slug: string;
  familySlug: FamilySlug;
  familyName: string;
  name: string;
  code: string;
  optionSummary: readonly string[];
  description?: string;
  imageLabel: string;
  mediaPath?: string;
  mediaFallbackPath?: string;
  mediaIndex?: number;
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
