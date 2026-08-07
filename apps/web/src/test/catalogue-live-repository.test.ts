import { describe, expect, it } from "vitest";
import type { CatalogueMetadataManifestEntry } from "@/features/catalogue-migration/catalogue-metadata-manifest";
import {
  CatalogueLiveParityError,
  CatalogueLiveReadError,
  loadCatalogueProducts,
  type CatalogueSnapshotReader
} from "@/features/catalogue-live/catalogue-live.repository";

const manifest: readonly CatalogueMetadataManifestEntry[] = [
  {
    familySlug: "cutters",
    publicSlug: "liston",
    dbSlug: "cutters-liston",
    expectedCode: "36-5101",
    expectedName: "Liston",
    expectedCatalogueCodes: [{ code: "36-5101", size: "14.0 cm" }],
    metadata: {
      sizes: ["14.0 cm"],
      variants: [],
      directions: ["Straight"],
      primaryOption: "Straight",
      cataloguePage: "1",
      mediaLabel: "Liston, Straight"
    }
  }
];

const reader: CatalogueSnapshotReader = {
  async read() {
    return {
      categories: [
        {
          id: "family-cutters",
          slug: "cutters",
          name_en: "Cutters",
          is_active: true,
          deleted_at: null
        }
      ],
      products: [
        {
          id: "uuid-liston",
          category_id: "family-cutters",
          item_code: "36-5101",
          name_en: "Liston",
          description_en: "Catalogue-listed Liston.",
          is_active: true,
          slug: "cutters-liston",
          created_at: "2026-08-01T00:00:00.000Z"
        }
      ],
      variants: [
        {
          product_id: "uuid-liston",
          sku: "36-5101",
          size: "14.0 cm",
          variant_type: "Straight",
          created_at: "2026-08-01T00:00:00.000Z"
        }
      ],
      images: [
        {
          product_id: "uuid-liston",
          image_path: "/media/catalogue-preview/cutters/cutters-liston-straight.avif",
          sort_order: 0
        }
      ]
    };
  }
};

describe("live catalogue repository", () => {
  it("hydrates products from the injected read-only snapshot", async () => {
    const products = await loadCatalogueProducts(reader, manifest);

    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      id: "uuid-liston",
      slug: "liston",
      code: "36-5101",
      mediaPath: "/media/catalogue-preview/cutters/cutters-liston-straight.avif"
    });
  });

  it("propagates read failures instead of returning an empty catalogue", async () => {
    const failingReader: CatalogueSnapshotReader = {
      async read() {
        throw new CatalogueLiveReadError("products", "database unavailable");
      }
    };

    await expect(loadCatalogueProducts(failingReader, manifest)).rejects.toThrow(
      /database unavailable/i
    );
  });

  it("classifies live-vs-manifest drift as parity failure, not an outage", async () => {
    const driftedReader: CatalogueSnapshotReader = {
      async read() {
        const snapshot = await reader.read();
        return {
          ...snapshot,
          products: snapshot.products.map((product) => ({
            ...product,
            item_code: "CHANGED-IN-LIVE-DATA"
          }))
        };
      }
    };

    await expect(loadCatalogueProducts(driftedReader, manifest)).rejects.toBeInstanceOf(
      CatalogueLiveParityError
    );
  });
});
