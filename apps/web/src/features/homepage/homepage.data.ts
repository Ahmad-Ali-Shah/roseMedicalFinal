import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";

const families = selectFamilyCards();

export const HOME_PAGE_MODEL = {
  hero: {
    ...PUBLIC_CONTENT_VALUES.homeHero,
    primary: { label: "Explore Products", href: "/products" as const },
    secondary: { label: "Request a Quote", href: "/request-quotation" as const }
  },
  familyIntro: {
    eyebrow: "Product families",
    title: "Browse by instrument family.",
    copy: "Five focused catalogues, organised for professional product discovery and inquiry."
  },
  families,
  procurement: {
    ...PUBLIC_CONTENT_VALUES.homeSupport,
    detailEyebrow: "Structured product information",
    detailTitle: "Built for practical buying decisions.",
    detailCopy: "Search by instrument family, review product codes and variants, collect quantities, and submit one organised request for quotation.",
    steps: ["Clear product codes", "Variant-aware inquiry", "One organised request"]
  },
  productsIntro: {
    eyebrow: "Selected instruments",
    title: "Representative products.",
    copy: "A concise preview. Full dimensions and options belong on the individual product page."
  },
  products: selectFeaturedProducts(),
  catalogue: {
    eyebrow: "Catalogues",
    title: "Technical catalogues for structured browsing.",
    copy: "Five instrument-family documents presented as part of the product experience, not as a file archive.",
    items: families.map((family, index) => ({
      number: String(index + 1).padStart(2, "0"),
      name: family.name,
      href: "/catalogues" as const
    }))
  },
  quotation: {
    eyebrow: "Request a quotation",
    title: "Prepare your instrument inquiry.",
    copy: "Build a structured product list and send one clear request to Rosa Medical.",
    primary: { label: "Request a Quote", href: "/request-quotation" as const }
  }
} as const;

export type HomeHeroModel = typeof HOME_PAGE_MODEL.hero;
export type HomeFamilyIntroModel = typeof HOME_PAGE_MODEL.familyIntro;
export type HomeProcurementModel = typeof HOME_PAGE_MODEL.procurement;
export type HomeProductsIntroModel = typeof HOME_PAGE_MODEL.productsIntro;
export type HomeCatalogueModel = typeof HOME_PAGE_MODEL.catalogue;
export type HomeQuotationModel = typeof HOME_PAGE_MODEL.quotation;
