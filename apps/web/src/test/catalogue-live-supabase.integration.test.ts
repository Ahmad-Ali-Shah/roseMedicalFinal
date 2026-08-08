import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { CATALOGUE_PRODUCTS } from "@/features/catalogue-registry";
import { clearCatalogueProjectionCache } from "@/features/catalogue-live/catalogue-live.cache";
import {
  getFamilyCatalogueProducts,
  getFeaturedCatalogueProducts,
  getProductCatalogueContext,
  getSearchCatalogueProducts
} from "@/features/catalogue-live/catalogue-live.repository";
import { CATALOGUE_METADATA_MANIFEST } from "@/features/catalogue-migration/catalogue-metadata-manifest";
import { mapLiveCatalogue } from "@/features/catalogue-live/map-live-product";
import type {
  LiveCategoryRow,
  LiveImageRow,
  LiveProductRow,
  LiveVariantRow
} from "@/features/catalogue-live/catalogue-live.types";

const runLiveParity = process.env.RUN_LIVE_CATALOGUE_PARITY === "1";

function expectLiveDatabaseIdentities(
  products: readonly { id: string; familySlug: string; slug: string }[]
): void {
  for (const product of products) {
    const staticRecord = CATALOGUE_PRODUCTS.find(
      (candidate) =>
        candidate.familySlug === product.familySlug &&
        candidate.slug === product.slug
    );
    expect(staticRecord).toBeDefined();
    expect(product.id).not.toBe(staticRecord!.id);
  }
}

describe.runIf(runLiveParity)("live Supabase catalogue parity", () => {
  it("hydrates all 113 approved products from the production read API without parity loss", async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(url, "NEXT_PUBLIC_SUPABASE_URL must be configured").toBeTruthy();
    expect(key, "NEXT_PUBLIC_SUPABASE_ANON_KEY must be configured").toBeTruthy();

    const supabase = createClient(url!, key!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

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

    expect(productsResult.error).toBeNull();
    expect(categoriesResult.error).toBeNull();
    expect(variantsResult.error).toBeNull();
    expect(imagesResult.error).toBeNull();

    const products = mapLiveCatalogue(
      {
        products: (productsResult.data ?? []) as LiveProductRow[],
        categories: (categoriesResult.data ?? []) as LiveCategoryRow[],
        variants: (variantsResult.data ?? []) as LiveVariantRow[],
        images: (imagesResult.data ?? []) as LiveImageRow[]
      },
      CATALOGUE_METADATA_MANIFEST
    );

    expect(products).toHaveLength(113);
    expect(products.every((product) => Boolean(product.mediaPath))).toBe(true);

    const familyCounts = products.reduce<Record<string, number>>(
      (counts, product) => ({
        ...counts,
        [product.familySlug]: (counts[product.familySlug] ?? 0) + 1
      }),
      {}
    );

    expect(familyCounts).toEqual({
      knives: 22,
      scissors: 42,
      punches: 15,
      chisels: 20,
      cutters: 14
    });

    expect(products.filter((product) => product.code === "18-0644")).toHaveLength(2);
    expect(
      products.find(
        (product) => product.familySlug === "cutters" && product.slug === "sc-01t"
      )
    ).toMatchObject({
      variants: ["Fine point"],
      directions: ["Straight"],
      catalogueReference: { page: "10" }
    });
  });

  it("serves real live rows through the bounded public projection APIs", async () => {
    clearCatalogueProjectionCache();
    const scissorsRoute = CATALOGUE_METADATA_MANIFEST.find(
      (entry) => entry.familySlug === "scissors"
    );
    expect(scissorsRoute).toBeDefined();

    const featured = await getFeaturedCatalogueProducts();
    const scissors = await getFamilyCatalogueProducts("scissors");
    const detailContext = await getProductCatalogueContext(
      "scissors",
      scissorsRoute!.publicSlug
    );
    const search = await getSearchCatalogueProducts();

    expect(featured.length).toBeGreaterThan(0);
    expect(scissors).toHaveLength(42);
    expect(detailContext).toHaveLength(42);
    expect(search).toHaveLength(113);

    expectLiveDatabaseIdentities(featured);
    expectLiveDatabaseIdentities(scissors);
    expectLiveDatabaseIdentities(search);
  });
});
