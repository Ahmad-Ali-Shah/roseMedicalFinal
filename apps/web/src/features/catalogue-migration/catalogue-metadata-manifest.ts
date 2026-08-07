import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import type { FamilySlug } from "@/features/public-catalogue/models";

export interface CatalogueMetadataPayload {
  sizes: readonly string[];
  variants: readonly string[];
  directions: readonly string[];
  primaryOption: string | null;
  cataloguePage: string | null;
  mediaLabel: string;
}

export interface CatalogueMetadataManifestEntry {
  familySlug: FamilySlug;
  publicSlug: string;
  dbSlug: string;
  expectedCode: string;
  expectedName: string;
  metadata: CatalogueMetadataPayload;
}

export const CATALOGUE_METADATA_MANIFEST: readonly CatalogueMetadataManifestEntry[] =
  CATALOGUE_PRODUCTS.map((product) => ({
    familySlug: product.familySlug,
    publicSlug: product.slug,
    dbSlug: `${product.familySlug}-${product.slug}`,
    expectedCode: product.code,
    expectedName: product.name,
    metadata: {
      sizes: [...product.sizes],
      variants: [...product.variants],
      directions: [...product.directions],
      primaryOption: product.primaryOption ?? null,
      cataloguePage: product.catalogueReference.page ?? null,
      mediaLabel: product.mediaLabel
    }
  }));
