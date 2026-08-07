import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import {
  CATALOGUE_METADATA_MANIFEST,
  type CatalogueMetadataManifestEntry
} from "@/features/catalogue-migration/catalogue-metadata-manifest";
import { createClient } from "@/lib/supabase/server";
import { mapLiveCatalogue } from "./map-live-product";
import type {
  LiveCatalogueSnapshot,
  LiveCategoryRow,
  LiveImageRow,
  LiveProductRow,
  LiveVariantRow
} from "./catalogue-live.types";

export class CatalogueLiveReadError extends Error {
  constructor(
    public readonly source: string,
    message: string,
    options?: ErrorOptions
  ) {
    super(`[catalogue-live:${source}] ${message}`, options);
    this.name = "CatalogueLiveReadError";
  }
}

export class CatalogueLiveParityError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(`[catalogue-live:parity] ${message}`, options);
    this.name = "CatalogueLiveParityError";
  }
}

export interface CatalogueSnapshotReader {
  read(): Promise<LiveCatalogueSnapshot>;
}

function messageFrom(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function requireSuccessfulRead<T>(
  source: string,
  result: { data: T[] | null; error: { message?: string } | null }
): T[] {
  if (result.error) {
    throw new CatalogueLiveReadError(
      source,
      result.error.message || "Supabase read failed"
    );
  }
  if (!result.data) {
    throw new CatalogueLiveReadError(source, "Supabase returned no data payload");
  }
  return result.data;
}

export async function loadCatalogueProducts(
  reader: CatalogueSnapshotReader,
  manifest: readonly CatalogueMetadataManifestEntry[] = CATALOGUE_METADATA_MANIFEST
): Promise<readonly CatalogueProductRecord[]> {
  let snapshot: LiveCatalogueSnapshot;
  try {
    snapshot = await reader.read();
  } catch (error) {
    if (error instanceof CatalogueLiveReadError) throw error;
    throw new CatalogueLiveReadError("snapshot", messageFrom(error), { cause: error });
  }

  try {
    return mapLiveCatalogue(snapshot, manifest);
  } catch (error) {
    throw new CatalogueLiveParityError(messageFrom(error), { cause: error });
  }
}

const supabaseCatalogueReader: CatalogueSnapshotReader = {
  async read(): Promise<LiveCatalogueSnapshot> {
    const supabase = await createClient();
    const [productsResult, categoriesResult, variantsResult, imagesResult] =
      await Promise.all([
        supabase
          .from("products")
          .select(
            "id,category_id,item_code,name_en,description_en,is_active,slug,created_at"
          )
          .eq("is_active", true),
        supabase
          .from("categories")
          .select("id,slug,name_en,is_active,deleted_at")
          .eq("is_active", true)
          .is("deleted_at", null),
        supabase
          .from("product_variants")
          .select("product_id,sku,size,variant_type,created_at")
          .order("created_at", { ascending: true }),
        supabase
          .from("product_images")
          .select("product_id,image_path,sort_order")
          .order("sort_order", { ascending: true })
      ]);

    return {
      products: requireSuccessfulRead(
        "products",
        productsResult as {
          data: LiveProductRow[] | null;
          error: { message?: string } | null;
        }
      ),
      categories: requireSuccessfulRead(
        "categories",
        categoriesResult as {
          data: LiveCategoryRow[] | null;
          error: { message?: string } | null;
        }
      ),
      variants: requireSuccessfulRead(
        "product_variants",
        variantsResult as {
          data: LiveVariantRow[] | null;
          error: { message?: string } | null;
        }
      ),
      images: requireSuccessfulRead(
        "product_images",
        imagesResult as {
          data: LiveImageRow[] | null;
          error: { message?: string } | null;
        }
      )
    };
  }
};

export async function getLiveCatalogueProducts(): Promise<
  readonly CatalogueProductRecord[]
> {
  return loadCatalogueProducts(supabaseCatalogueReader);
}

export async function getPublicCatalogueProducts(): Promise<
  readonly CatalogueProductRecord[]
> {
  try {
    return await getLiveCatalogueProducts();
  } catch (error) {
    if (error instanceof CatalogueLiveParityError) {
      console.error(
        "[catalogue-migration] live catalogue parity check failed; refusing stale fallback",
        error
      );
      throw error;
    }
    if (!(error instanceof CatalogueLiveReadError)) throw error;

    console.warn(
      "[catalogue-migration] live product read unavailable; using temporary static fallback",
      error
    );
    return CATALOGUE_PRODUCTS;
  }
}

export async function getSearchCatalogueProducts(): Promise<
  readonly CatalogueProductRecord[]
> {
  return getPublicCatalogueProducts();
}
