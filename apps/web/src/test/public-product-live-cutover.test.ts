import { describe, expect, it } from "vitest";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { createFamilyListingData } from "@/features/family-listing/family-listing.data";
import { createHomePageModel } from "@/features/homepage/homepage.data";
import { createProductDetailData } from "@/features/product-detail/product-detail.data";
import { selectFeaturedProducts } from "@/features/public-catalogue";
import { createProductsPageModel } from "@/features/products/products.data";
import { selectProductCatalogueContext } from "@/features/catalogue-live/catalogue-live.repository";

const products: readonly CatalogueProductRecord[] = [
  {
    id: "db-no3",
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    name: "Scalpel Handle No. 3",
    code: "18-0644",
    description: "Live No. 3 description",
    sizes: ["14.5 cm"],
    variants: ["No. 3"],
    directions: [],
    primaryOption: "14.5 cm",
    catalogueReference: { family: "Knives", page: "6" },
    mediaLabel: "Live No. 3 media",
    mediaPath: "/media/live-no3.avif"
  },
  {
    id: "db-round",
    familySlug: "knives",
    slug: "round-straight",
    name: "Round Scalpel Handle",
    code: "18-0644",
    description: "Round handle",
    sizes: ["13.0 cm"],
    variants: ["Round"],
    directions: ["Straight"],
    primaryOption: "13.0 cm",
    catalogueReference: { family: "Knives", page: "4" },
    mediaLabel: "Round handle",
    mediaPath: "/media/round.avif"
  },
  {
    id: "db-mayo",
    familySlug: "scissors",
    slug: "mayo-scissors",
    name: "Mayo Scissors",
    code: "04-0401",
    description: "Live Mayo description",
    sizes: ["14.5 cm", "17.0 cm"],
    variants: ["Regular"],
    directions: ["Straight"],
    primaryOption: "Regular · Straight",
    catalogueReference: { family: "Scissors", page: "4" },
    mediaLabel: "Live Mayo media",
    mediaPath: "/media/live-mayo.avif"
  },
  {
    id: "db-biopsy",
    familySlug: "punches",
    slug: "biopsy-punch",
    name: "Biopsy Punch",
    code: "23-1204",
    description: "Live Biopsy description",
    sizes: ["4 mm"],
    variants: ["Biopsy"],
    directions: [],
    primaryOption: "4 mm",
    catalogueReference: { family: "Punches", page: "5" },
    mediaLabel: "Live Biopsy media",
    mediaPath: "/media/live-biopsy.avif"
  },
  {
    id: "db-codman",
    familySlug: "chisels",
    slug: "codman",
    name: "Codman",
    code: "36-7101",
    description: "Live Codman description",
    sizes: ["28 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "28 cm",
    catalogueReference: { family: "Chisels", page: "5" },
    mediaLabel: "Live Codman media",
    mediaPath: "/media/live-codman.avif"
  },
  {
    id: "db-liston",
    familySlug: "cutters",
    slug: "liston",
    name: "Liston",
    code: "36-5101",
    description: "Live Liston description",
    sizes: ["14.0 cm"],
    variants: [],
    directions: ["Straight"],
    primaryOption: "Straight",
    catalogueReference: { family: "Cutters", page: "1" },
    mediaLabel: "Live Liston media",
    mediaPath: "/media/live-liston.avif"
  }
];

describe("public product live cutover models", () => {
  it("builds a family listing only from the injected canonical catalogue", () => {
    const data = createFamilyListingData("knives", products);
    expect(data?.products.map((product) => product.id)).toEqual([
      "db-no3",
      "db-round"
    ]);
    expect(data?.countLabel).toBe("2 products");
  });

  it("builds product detail and related products from public route identity", () => {
    const data = createProductDetailData(
      "knives",
      "scalpel-handle-no-3",
      products
    );

    expect(data?.product.id).toBe("db-no3");
    expect(data?.related.map((product) => product.id)).toEqual(["db-round"]);
    expect(data?.specifications).toContainEqual([
      "Catalogue reference",
      "Knives · Page 6"
    ]);
    expect(data?.specifications).toContainEqual(["Listed options", "No. 3"]);
  });

  it("resolves a live-only product from the same family projection as its card", () => {
    const liveOnlyProduct: CatalogueProductRecord = {
      ...products[0]!,
      id: "db-live-0303",
      slug: "0303",
      name: "Temporary",
      code: "0303"
    };
    const familyProjection = [
      ...products.filter((product) => product.familySlug === "knives"),
      liveOnlyProduct
    ];

    const context = selectProductCatalogueContext(familyProjection, "0303");

    expect(context[0]).toBe(liveOnlyProduct);
    expect(context).toHaveLength(3);
  });

  it("hydrates featured selections from canonical contents instead of stale fixture fields", () => {
    const featured = selectFeaturedProducts(products);
    const mayo = featured.find((product) => product.slug === "mayo-scissors");

    expect(featured.map((product) => product.id)).toEqual([
      "db-no3",
      "db-mayo",
      "db-biopsy",
      "db-codman",
      "db-liston"
    ]);
    expect(mayo).toMatchObject({
      code: "04-0401",
      description: "Live Mayo description",
      imageLabel: "Live Mayo media",
      mediaPath: "/media/live-mayo.avif",
      optionSummary: ["14.5 cm", "Regular"]
    });
  });

  it("keeps Products overview live while homepage discovery remains family-registry based", () => {
    const productsModel = createProductsPageModel(products, "en");
    const homeModel = createHomePageModel(products, "en");
    const homeAr = createHomePageModel(products, "ar");
    const homepageFamilyOrder = ["scissors", "cutters", "punches", "chisels", "knives"];

    expect(productsModel.products.map((product) => product.id)).toEqual([
      "db-no3",
      "db-mayo",
      "db-biopsy",
      "db-codman",
      "db-liston"
    ]);
    expect(homeModel.families.map((family) => family.slug)).toEqual(homepageFamilyOrder);
    expect(homeAr.families.map((family) => family.slug)).toEqual(homepageFamilyOrder);
  });
});
