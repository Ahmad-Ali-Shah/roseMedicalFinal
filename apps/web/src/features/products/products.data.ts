import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";
import type { PublicLocale } from "@/features/localization/locales";
import type { Route } from "next";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import type { FamilyCardModel, ProductPreviewModel } from "@/features/public-catalogue";

const families = selectFamilyCards();
const familiesAr = families.map((family) => ({
  ...family,
  name: FAMILY_NAMES_AR[family.slug]
}));

const PRODUCTS_PAGE_COPY = {
  en: {
    hero: {
      eyebrow: "Product catalogue",
      title: "Medical instruments, organised for procurement.",
      copy: "Browse Rosa Medical by instrument family, product code, size and variant. Add selected instruments to one structured request for quotation."
    },
    discovery: {
      searchLabel: "Search by product name or code",
      searchAction: { label: "Search", href: "/search" as const },
      inquiryAction: { label: "Inquiry", href: "/inquiry" as const }
    },
    familyIntro: {
      eyebrow: "Instrument families",
      title: "Start with the right family."
    },
    productsIntro: {
      eyebrow: "Representative products",
      title: "A concise view into the catalogue.",
      copy: "Product cards surface only the information needed to identify and prepare an inquiry."
    },
    catalogue: {
      eyebrow: "Technical catalogues",
      title: "Prefer document-led browsing?",
      copy: "Open a family catalogue, then return to the matching web collection when you are ready to build an inquiry."
    },
    procurement: {
      eyebrow: "Request a quotation",
      title: "Found the instruments you need?",
      copy: "Add products to an inquiry or send a general procurement request.",
      primary: { label: "Request a Quote", href: "/request-quotation" as const }
    }
  },
  ar: {
    hero: {
      eyebrow: "كتالوج المنتجات",
      title: "أدوات طبية منظمة لتسهيل المشتريات.",
      copy: "استعرض منتجات روزا ميديكال حسب عائلة الأدوات أو رمز المنتج أو المقاس أو الخيار، وأضف اختياراتك إلى طلب عرض سعر واحد."
    },
    discovery: {
      searchLabel: "ابحث باسم المنتج أو رمزه",
      searchAction: { label: "بحث", href: "/search" as const },
      inquiryAction: { label: "الاستفسار", href: "/inquiry" as const }
    },
    familyIntro: { eyebrow: "عائلات الأدوات", title: "ابدأ بالعائلة المناسبة." },
    productsIntro: {
      eyebrow: "منتجات تمثيلية",
      title: "نظرة موجزة إلى الكتالوج.",
      copy: "تعرض البطاقات المعلومات اللازمة لتحديد المنتج وإضافته إلى الاستفسار."
    },
    catalogue: {
      eyebrow: "الكتالوجات التقنية",
      title: "تفضّل الاستعراض عبر الوثائق؟",
      copy: "افتح كتالوج العائلة ثم عد إلى المجموعة المطابقة لإعداد استفسارك."
    },
    procurement: {
      eyebrow: "طلب عرض سعر",
      title: "هل وجدت الأدوات المطلوبة؟",
      copy: "أضف المنتجات إلى الاستفسار أو أرسل طلب مشتريات عامًا.",
      primary: { label: "اطلب عرض سعر", href: "/request-quotation" as const }
    }
  }
} as const;

export function createProductsPageModel(
  products: readonly CatalogueProductRecord[],
  locale: PublicLocale = "en"
): ProductsPageModel {
  const ar = locale === "ar";
  const copy = PRODUCTS_PAGE_COPY[locale];
  const localizedFamilies = ar ? familiesAr : families;
  const featured = selectFeaturedProducts(products).map((product) =>
    ar ? { ...product, familyName: FAMILY_NAMES_AR[product.familySlug] } : product
  );

  return {
    hero: copy.hero,
    discovery: copy.discovery,
    familyIntro: copy.familyIntro,
    families: localizedFamilies,
    productsIntro: copy.productsIntro,
    products: featured,
    catalogue: {
      ...copy.catalogue,
      items: localizedFamilies.map((family, index) => ({
        number: String(index + 1).padStart(2, "0"),
        name: family.name,
        href: "/catalogues" as const
      }))
    },
    procurement: copy.procurement
  };
}

export interface ProductsHeroModel { eyebrow: string; title: string; copy: string }
export interface ProductsDiscoveryModel { searchLabel: string; searchAction: { label: string; href: Route<string> }; inquiryAction: { label: string; href: Route<string> } }
export interface ProductsFamilyIntroModel { eyebrow: string; title: string }
export interface ProductsIntroModel { eyebrow: string; title: string; copy: string }
export interface ProductsCatalogueModel { eyebrow: string; title: string; copy: string; items: readonly { number: string; name: string; href: Route<string> }[] }
export interface ProductsProcurementModel { eyebrow: string; title: string; copy: string; primary: { label: string; href: Route<string> } }

export interface ProductsPageModel {
  hero: ProductsHeroModel;
  discovery: ProductsDiscoveryModel;
  familyIntro: ProductsFamilyIntroModel;
  families: readonly FamilyCardModel[];
  productsIntro: ProductsIntroModel;
  products: readonly ProductPreviewModel[];
  catalogue: ProductsCatalogueModel;
  procurement: ProductsProcurementModel;
}
