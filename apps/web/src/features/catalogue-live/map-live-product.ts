import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import type { CatalogueMetadataManifestEntry } from "@/features/catalogue-migration/catalogue-metadata-manifest";
import { FAMILY_SLUGS, type FamilySlug } from "@/features/public-catalogue/models";
import type {
  LiveCatalogueSnapshot,
  LiveCategoryRow,
  LiveImageRow,
  LiveProductRow,
  LiveVariantRow
} from "./catalogue-live.types";

function isFamilySlug(value: string): value is FamilySlug {
  return (FAMILY_SLUGS as readonly string[]).includes(value);
}

function byCreatedAt(left: LiveVariantRow, right: LiveVariantRow): number {
  return left.created_at.localeCompare(right.created_at);
}

function categoryFor(
  product: LiveProductRow,
  categoriesById: ReadonlyMap<string, LiveCategoryRow>
): LiveCategoryRow {
  if (!product.category_id) {
    throw new Error(`[catalogue-migration] product ${product.slug} has no category`);
  }

  const category = categoriesById.get(product.category_id);
  if (!category || !category.is_active || category.deleted_at !== null) {
    throw new Error(`[catalogue-migration] product ${product.slug} has no active family`);
  }
  if (!isFamilySlug(category.slug)) {
    throw new Error(
      `[catalogue-migration] product ${product.slug} references unknown family ${category.slug}`
    );
  }

  return category;
}

function validateIdentity(
  product: LiveProductRow,
  category: LiveCategoryRow,
  manifest: CatalogueMetadataManifestEntry
): void {
  if (
    product.slug !== manifest.dbSlug ||
    category.slug !== manifest.familySlug ||
    product.item_code !== manifest.expectedCode ||
    product.name_en !== manifest.expectedName
  ) {
    throw new Error(
      `[catalogue-migration] identity mismatch for ${manifest.dbSlug}: expected ${manifest.expectedCode} / ${manifest.expectedName}`
    );
  }
}

function primaryImageFor(
  productId: string,
  images: readonly LiveImageRow[]
): string | undefined {
  const primary = images.find(
    (image) => image.product_id === productId && image.sort_order === 0
  );
  return primary?.image_path.trim() || undefined;
}

function catalogueCodesFor(
  productId: string,
  variants: readonly LiveVariantRow[]
): readonly { code: string; size: string }[] {
  return variants
    .filter((variant) => variant.product_id === productId)
    .slice()
    .sort(byCreatedAt)
    .flatMap((variant) => {
      const code = variant.sku?.trim();
      const size = variant.size?.trim();
      return code && size ? [{ code, size }] : [];
    });
}

export function mapLiveCatalogue(
  snapshot: LiveCatalogueSnapshot,
  manifest: readonly CatalogueMetadataManifestEntry[]
): readonly CatalogueProductRecord[] {
  const activeProducts = snapshot.products.filter((product) => product.is_active);
  if (activeProducts.length !== manifest.length) {
    throw new Error(
      `[catalogue-migration] product count mismatch: live=${activeProducts.length} manifest=${manifest.length}`
    );
  }

  const productsBySlug = new Map(activeProducts.map((product) => [product.slug, product] as const));
  if (productsBySlug.size !== activeProducts.length) {
    throw new Error("[catalogue-migration] duplicate live product slug detected");
  }

  const manifestBySlug = new Map(manifest.map((entry) => [entry.dbSlug, entry] as const));
  if (manifestBySlug.size !== manifest.length) {
    throw new Error("[catalogue-migration] duplicate manifest product slug detected");
  }

  for (const product of activeProducts) {
    if (!manifestBySlug.has(product.slug)) {
      throw new Error(`[catalogue-migration] live product missing from manifest: ${product.slug}`);
    }
  }

  const categoriesById = new Map(
    snapshot.categories.map((category) => [category.id, category] as const)
  );

  return manifest.map((entry): CatalogueProductRecord => {
    const product = productsBySlug.get(entry.dbSlug);
    if (!product) {
      throw new Error(`[catalogue-migration] manifest product missing from live data: ${entry.dbSlug}`);
    }

    const category = categoryFor(product, categoriesById);
    validateIdentity(product, category, entry);

    const description = product.description_en?.trim();
    const mediaPath = primaryImageFor(product.id, snapshot.images);
    const catalogueCodes = catalogueCodesFor(product.id, snapshot.variants);

    return {
      id: product.id,
      familySlug: entry.familySlug,
      slug: entry.publicSlug,
      name: product.name_en,
      code: product.item_code!,
      ...(description ? { description } : {}),
      sizes: entry.metadata.sizes,
      variants: entry.metadata.variants,
      directions: entry.metadata.directions,
      ...(entry.metadata.primaryOption
        ? { primaryOption: entry.metadata.primaryOption }
        : {}),
      catalogueReference: {
        family: category.name_en,
        ...(entry.metadata.cataloguePage
          ? { page: entry.metadata.cataloguePage }
          : {})
      },
      mediaLabel: entry.metadata.mediaLabel,
      ...(catalogueCodes.length ? { catalogueCodes } : {}),
      ...(mediaPath ? { mediaPath } : {})
    };
  });
}
