import { selectFamilyCards, selectFeaturedProducts } from "@/features/public-catalogue";

const families = selectFamilyCards();

export const PRODUCTS_PAGE_MODEL = {
  hero: {
    eyebrow: "Product catalogue",
    title: "Medical instruments, organised for procurement.",
    copy: "Browse Rosa Medical by instrument family, product code, size and variant. Add selected instruments to one structured request for quotation."
  },
  discovery: {
    searchLabel: "Search by product name or code",
    searchAction: { label: "Search", href: "/search" as const },
    inquiryAction: { label: "View inquiry (0)", href: "/inquiry" as const }
  },
  familyIntro: {
    eyebrow: "Instrument families",
    title: "Start with the right family."
  },
  families,
  productsIntro: {
    eyebrow: "Representative products",
    title: "A concise view into the catalogue.",
    copy: "Product cards surface only the information needed to identify and prepare an inquiry."
  },
  products: selectFeaturedProducts(),
  catalogue: {
    eyebrow: "Technical catalogues",
    title: "Prefer document-led browsing?",
    copy: "Open a family catalogue, then return to the matching web collection when you are ready to build an inquiry.",
    items: families.map((family, index) => ({
      number: String(index + 1).padStart(2, "0"),
      name: family.name,
      href: "/catalogues" as const
    }))
  },
  procurement: {
    eyebrow: "Request a quotation",
    title: "Found the instruments you need?",
    copy: "Add products to an inquiry or send a general procurement request.",
    primary: { label: "Request a Quote", href: "/request-quotation" as const }
  }
} as const;

export type ProductsHeroModel = typeof PRODUCTS_PAGE_MODEL.hero;
export type ProductsDiscoveryModel = typeof PRODUCTS_PAGE_MODEL.discovery;
export type ProductsFamilyIntroModel = typeof PRODUCTS_PAGE_MODEL.familyIntro;
export type ProductsIntroModel = typeof PRODUCTS_PAGE_MODEL.productsIntro;
export type ProductsCatalogueModel = typeof PRODUCTS_PAGE_MODEL.catalogue;
export type ProductsProcurementModel = typeof PRODUCTS_PAGE_MODEL.procurement;
