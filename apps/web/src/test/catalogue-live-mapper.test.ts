import { describe, expect, it } from "vitest";
import type { CatalogueMetadataManifestEntry } from "@/features/catalogue-migration/catalogue-metadata-manifest";
import { mapLiveCatalogue } from "@/features/catalogue-live/map-live-product";
import type { LiveCatalogueSnapshot } from "@/features/catalogue-live/catalogue-live.types";

const manifest: readonly CatalogueMetadataManifestEntry[] = [
  {
    familySlug: "cutters",
    publicSlug: "liston",
    dbSlug: "cutters-liston",
    expectedCode: "36-5101",
    expectedName: "Liston",
    expectedCatalogueCodes: [
      { code: "36-5101", size: "14.0 cm" },
      { code: "36-5102", size: "17.0 cm" }
    ],
    metadata: {
      sizes: ["14.0 cm", "17.0 cm"],
      variants: [],
      directions: ["Straight"],
      primaryOption: "Straight",
      cataloguePage: "1",
      mediaLabel: "Liston, Straight"
    }
  },
  {
    familySlug: "cutters",
    publicSlug: "sc-01t",
    dbSlug: "cutters-sc-01t",
    expectedCode: "SC-01T",
    expectedName: "SC-01T",
    expectedCatalogueCodes: null,
    metadata: {
      sizes: ["12.5 cm"],
      variants: ["Fine point"],
      directions: ["Straight"],
      primaryOption: "12.5 cm",
      cataloguePage: "10",
      mediaLabel: "SC-01T"
    }
  }
];

function snapshot(): LiveCatalogueSnapshot {
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
        description_en: "Catalogue-listed Liston in straight form.",
        is_active: true,
        slug: "cutters-liston",
        created_at: "2026-08-01T00:00:00.000Z"
      },
      {
        id: "uuid-sc-01t",
        category_id: "family-cutters",
        item_code: "SC-01T",
        name_en: "SC-01T",
        description_en: "Catalogue-listed SC-01T pattern.",
        is_active: true,
        slug: "cutters-sc-01t",
        created_at: "2026-08-01T00:01:00.000Z"
      }
    ],
    variants: [
      {
        product_id: "uuid-liston",
        sku: "36-5102",
        size: "17.0 cm",
        variant_type: "Straight",
        created_at: "2026-08-01T00:02:00.000Z"
      },
      {
        product_id: "uuid-liston",
        sku: "36-5101",
        size: "14.0 cm",
        variant_type: "Straight",
        created_at: "2026-08-01T00:01:00.000Z"
      },
      {
        product_id: "uuid-sc-01t",
        sku: "SC-01T",
        size: "12.5 cm",
        variant_type: "Straight",
        created_at: "2026-08-01T00:03:00.000Z"
      }
    ],
    images: [
      {
        product_id: "uuid-liston",
        image_path: "/media/catalogue-preview/cutters/liston-secondary.avif",
        sort_order: 1
      },
      {
        product_id: "uuid-liston",
        image_path: "/media/catalogue-preview/cutters/cutters-liston-straight.avif",
        sort_order: 0
      },
      {
        product_id: "uuid-sc-01t",
        image_path: "/media/catalogue-preview/cutters/owner-sc-01t.png",
        sort_order: 0
      }
    ]
  };
}

describe("live catalogue mapper", () => {
  it("uses live identity/text/codes/media while preserving approved display metadata", () => {
    const products = mapLiveCatalogue(snapshot(), manifest);
    const liston = products.find((product) => product.slug === "liston");
    const sc01t = products.find((product) => product.slug === "sc-01t");

    expect(products).toHaveLength(2);
    expect(liston).toMatchObject({
      id: "uuid-liston",
      familySlug: "cutters",
      slug: "liston",
      code: "36-5101",
      name: "Liston",
      mediaPath: "/media/catalogue-preview/cutters/cutters-liston-straight.avif",
      sizes: ["14.0 cm", "17.0 cm"],
      directions: ["Straight"],
      catalogueReference: { family: "Cutters", page: "1" }
    });
    expect(liston?.catalogueCodes).toEqual([
      { code: "36-5101", size: "14.0 cm" },
      { code: "36-5102", size: "17.0 cm" }
    ]);

    expect(sc01t).toMatchObject({
      id: "uuid-sc-01t",
      variants: ["Fine point"],
      directions: ["Straight"],
      primaryOption: "12.5 cm",
      catalogueReference: { family: "Cutters", page: "10" }
    });
  });

  it("fails closed when live identity differs from the approved manifest", () => {
    const changed = snapshot();
    changed.products[0]!.item_code = "WRONG";

    expect(() => mapLiveCatalogue(changed, manifest)).toThrow(/identity mismatch/i);
  });

  it("fails closed when exact live code options drift from the approved source", () => {
    const changed = snapshot();
    changed.variants[0]!.size = "99.0 cm";

    expect(() => mapLiveCatalogue(changed, manifest)).toThrow(/code option mismatch/i);
  });

  it("fails closed when a live product loses its single primary image relationship", () => {
    const changed = snapshot();
    changed.images = changed.images.filter(
      (image) => !(image.product_id === "uuid-liston" && image.sort_order === 0)
    );

    expect(() => mapLiveCatalogue(changed, manifest)).toThrow(/primary image mismatch/i);
  });

  it("fails closed when the live and manifest product sets differ", () => {
    const changed = snapshot();
    changed.products = changed.products.slice(0, 1);

    expect(() => mapLiveCatalogue(changed, manifest)).toThrow(/product count mismatch/i);
  });

  it("does not use item code as product identity", () => {
    const duplicateManifest: readonly CatalogueMetadataManifestEntry[] = [
      {
        ...manifest[0]!,
        familySlug: "knives",
        publicSlug: "round-straight",
        dbSlug: "knives-round-straight",
        expectedCode: "18-0644",
        expectedName: "Round Scalpel Handle",
        expectedCatalogueCodes: null,
        metadata: { ...manifest[0]!.metadata, mediaLabel: "Round Scalpel Handle" }
      },
      {
        ...manifest[1]!,
        familySlug: "knives",
        publicSlug: "scalpel-handle-no-3",
        dbSlug: "knives-scalpel-handle-no-3",
        expectedCode: "18-0644",
        expectedName: "Scalpel Handle No. 3",
        expectedCatalogueCodes: null,
        metadata: { ...manifest[1]!.metadata, mediaLabel: "Scalpel Handle No. 3" }
      }
    ];
    const duplicateSnapshot: LiveCatalogueSnapshot = {
      categories: [{ id: "family-knives", slug: "knives", name_en: "Knives", is_active: true, deleted_at: null }],
      products: duplicateManifest.map((entry, index) => ({
        id: `uuid-${index}`,
        category_id: "family-knives",
        item_code: entry.expectedCode,
        name_en: entry.expectedName,
        description_en: entry.expectedName,
        is_active: true,
        slug: entry.dbSlug,
        created_at: `2026-08-01T00:0${index}:00.000Z`
      })),
      variants: [],
      images: duplicateManifest.map((entry, index) => ({
        product_id: `uuid-${index}`,
        image_path: `/media/${entry.publicSlug}.avif`,
        sort_order: 0
      }))
    };

    expect(mapLiveCatalogue(duplicateSnapshot, duplicateManifest).map((product) => product.slug)).toEqual([
      "round-straight",
      "scalpel-handle-no-3"
    ]);
  });
});
