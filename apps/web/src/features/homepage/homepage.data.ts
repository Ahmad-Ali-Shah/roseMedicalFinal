import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import {
  FAMILY_SLUGS,
  familyNameBySlug,
  selectFamilyCards,
  selectFeaturedProducts,
  type FamilySlug,
  type PublicMediaModel
} from "@/features/public-catalogue";
import { HOME_CATALOGUE_MEDIA_BY_SLUG } from "@/features/public-media";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import {
  FAMILY_NAMES_AR,
  HOME_PAGE_MODEL_AR
} from "@/features/localization/public-copy";
import type { PublicLocale } from "@/features/localization/locales";
import type { Route } from "next";

const families = selectFamilyCards();

export const HOME_PAGE_MODEL = {
  hero: {
    ...PUBLIC_CONTENT_VALUES.homeHero,
    primary: { label: "Explore Products", href: "/products" as const },
    secondary: { label: "Request a Quote", href: "/request-quotation" as const }
  },
  familyIntro: {
    eyebrow: "Our products",
    title: "Explore the ROSA instrument collection.",
    copy: "Five focused instrument collections, presented clearly for product browsing."
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
  catalogue: {
    eyebrow: "Catalogues",
    title: "Technical catalogues for structured browsing.",
    copy: "Five instrument-family documents presented as part of the product experience, not as a file archive.",
    items: FAMILY_SLUGS.map((slug, index) => ({
      number: String(index + 1).padStart(2, "0"),
      slug,
      name: familyNameBySlug(slug),
      media: HOME_CATALOGUE_MEDIA_BY_SLUG[slug],
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

export function createHomePageModel(
  products: readonly CatalogueProductRecord[],
  locale: PublicLocale = "en"
) {
  const featured = selectFeaturedProducts(products);
  if (locale === "ar") {
    return {
      ...HOME_PAGE_MODEL_AR,
      products: featured.map((product) => ({
        ...product,
        familyName: FAMILY_NAMES_AR[product.familySlug]
      }))
    } as const;
  }

  return {
    ...HOME_PAGE_MODEL,
    products: featured
  } as const;
}

export interface HomeHeroModel { eyebrow: string; title: string; copy: string; primary: { label: string; href: Route<string> }; secondary: { label: string; href: Route<string> } }
export interface HomeFamilyIntroModel { eyebrow: string; title: string; copy: string }
export interface HomeProcurementModel { eyebrow: string; title: string; copy: string; detailEyebrow: string; detailTitle: string; detailCopy: string; steps: readonly string[] }
export interface HomeProductsIntroModel { eyebrow: string; title: string; copy: string }
export interface HomeCatalogueModel { eyebrow: string; title: string; copy: string; items: readonly { number: string; slug: FamilySlug; name: string; media: PublicMediaModel; href: Route<string> }[] }
export interface HomeQuotationModel { eyebrow: string; title: string; copy: string; primary: { label: string; href: Route<string> } }
