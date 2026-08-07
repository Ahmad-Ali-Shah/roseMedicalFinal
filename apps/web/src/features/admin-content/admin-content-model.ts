import {
  CATALOGUE_FAMILIES,
  CATALOGUE_PRODUCTS,
  type CatalogueFamilyRecord
} from "@/features/catalogue-registry";
import {
  selectFeaturedProducts,
  type ProductPreviewModel
} from "@/features/public-catalogue";
import {
  PUBLIC_CONTENT_BLOCKS,
  type PublicContentBlock
} from "@/features/public-content-registry";

export type AdminContentBlockModel = PublicContentBlock;

export interface AdminHomepageCompositionModel {
  families: readonly CatalogueFamilyRecord[];
  products: readonly ProductPreviewModel[];
}

export function getAdminContentBlocks(): readonly AdminContentBlockModel[] {
  return PUBLIC_CONTENT_BLOCKS;
}

export function getAdminHomepageComposition(): AdminHomepageCompositionModel {
  return {
    families: CATALOGUE_FAMILIES,
    products: selectFeaturedProducts(CATALOGUE_PRODUCTS)
  };
}
