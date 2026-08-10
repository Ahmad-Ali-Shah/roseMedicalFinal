import type { ReactNode } from "react";
import { AboutPage } from "@/features/about";
import { CataloguesPage } from "@/features/catalogues";
import { ContactPage } from "@/features/contact-preview";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { Homepage } from "@/features/homepage/homepage";
import { InquiryPage, QuotationPage } from "@/features/inquiry";
import {
  LegalPage,
  PRIVACY_DOCUMENT,
  TERMS_DOCUMENT
} from "@/features/legal-pages";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";
import { FAMILY_SLUGS } from "@/features/public-catalogue";
import { ProductsOverview } from "@/features/products/products-overview";
import { ProcurementSupportPage } from "@/features/procurement-support";
import { SearchDefaultPage } from "@/features/search-preview";
import type { PublicLocale } from "@/features/localization/locales";

export type PublicPageKind =
  | "homepage"
  | "products"
  | "catalogues"
  | "inquiry-empty"
  | "quotation-blocked"
  | "about"
  | "procurement-support"
  | "contact-static"
  | "search-default"
  | "privacy-template"
  | "terms-template"
  | "family"
  | "product"
  | "not-found";

function isKnownFamilyRoute(slug: string | undefined): boolean {
  return Boolean(slug && (FAMILY_SLUGS as readonly string[]).includes(slug));
}

function isKnownProductRoute(
  familySlug: string | undefined,
  productSlug: string | undefined
): boolean {
  // Route SHAPE only: a known family slug plus a non-empty product slug is
  // enough to hand off to ProductDetailPage, which resolves existence
  // against live Supabase (including live-only products with no static
  // manifest entry). ProductDetailPage calls notFound() itself when the
  // slug doesn't resolve to a real product.
  if (!familySlug || !productSlug || !productSlug.trim()) return false;
  return isKnownFamilyRoute(familySlug);
}

export function resolvePublicPageKind(key: string): PublicPageKind {
  if (key === "") return "homepage";
  if (key === "products") return "products";
  if (key === "catalogues") return "catalogues";
  if (key === "inquiry") return "inquiry-empty";
  if (key === "request-quotation") return "quotation-blocked";
  if (key === "about") return "about";
  if (key === "procurement-support") return "procurement-support";
  if (key === "contact") return "contact-static";
  if (key === "search") return "search-default";
  if (key === "privacy") return "privacy-template";
  if (key === "terms") return "terms-template";

  const segments = key.split("/").filter(Boolean);
  if (segments[0] !== "products") return "not-found";
  if (segments.length === 2 && isKnownFamilyRoute(segments[1])) return "family";
  if (
    segments.length === 3 &&
    isKnownProductRoute(segments[1], segments[2])
  ) {
    return "product";
  }
  return "not-found";
}

export function resolvePublicPage({
  key,
  searchQuery = "",
  locale = "en"
}: {
  key: string;
  path: string;
  title: string;
  searchQuery?: string;
  locale?: PublicLocale;
}): ReactNode | null {
  const kind = resolvePublicPageKind(key);
  const segments = key.split("/").filter(Boolean);

  switch (kind) {
    case "homepage":
      return <Homepage locale={locale} />;
    case "products":
      return <ProductsOverview locale={locale} />;
    case "catalogues":
      return <CataloguesPage locale={locale} />;
    case "inquiry-empty":
      return <InquiryPage />;
    case "quotation-blocked":
      return <QuotationPage />;
    case "about":
      return <AboutPage locale={locale} />;
    case "procurement-support":
      return <ProcurementSupportPage locale={locale} />;
    case "contact-static":
      return <ContactPage locale={locale} />;
    case "search-default":
      return <SearchDefaultPage initialQuery={searchQuery} locale={locale} />;
    case "privacy-template":
      return <LegalPage document={PRIVACY_DOCUMENT} locale={locale} />;
    case "terms-template":
      return <LegalPage document={TERMS_DOCUMENT} locale={locale} />;
    case "family":
      return <FamilyListingPage familySlug={segments[1] ?? ""} locale={locale} />;
    case "product":
      return (
        <ProductDetailPage
          familySlug={segments[1] ?? ""}
          productSlug={segments[2] ?? ""}
          locale={locale}
        />
      );
    case "not-found":
      return null;
  }
}
