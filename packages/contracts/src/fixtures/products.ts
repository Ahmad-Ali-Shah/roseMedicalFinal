import type { components } from "../generated/schema";

export const productFixtures = [
  {
    id: "product_scalpel_handle_3",
    slug: "scalpel-handle-no-3",
    code: "18-0644",
    familySlug: "knives",
    name: { en: "Scalpel Handle No. 3", ar: null },
    shortDescription: { en: "Reusable surgical instrument handle presented with product code and available options.", ar: null },
    mainImage: null,
    optionSummary: ["14.5 cm", "Standard"]
  },
  {
    id: "product_mayo_scissors",
    slug: "mayo-scissors",
    code: "04-0402",
    familySlug: "scissors",
    name: { en: "Mayo Scissors", ar: null },
    shortDescription: { en: "Surgical scissors prepared for product and quotation review.", ar: null },
    mainImage: null,
    optionSummary: ["17 cm", "Curved"]
  },
  {
    id: "product_biopsy_punch",
    slug: "biopsy-punch",
    code: "23-1204",
    familySlug: "punches",
    name: { en: "Biopsy Punch", ar: null },
    shortDescription: { en: "Punch instrument presented with a clear product reference for inquiry preparation.", ar: null },
    mainImage: null,
    optionSummary: ["4 mm", "Standard"]
  }
] satisfies components["schemas"]["ProductSummary"][];

const primaryProduct = productFixtures[0]!;

export const productDetailFixture = {
  ...primaryProduct,
  gallery: [],
  options: [
    { id: "size_145", type: "size", label: { en: "14.5 cm", ar: null }, value: "14.5 cm" },
    { id: "variant_standard", type: "variant", label: { en: "Standard", ar: null }, value: "standard" }
  ],
  catalogueReference: { familySlug: "knives", page: "6" }
} satisfies components["schemas"]["ProductDetail"];
