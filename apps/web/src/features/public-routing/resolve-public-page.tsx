import type { ReactNode } from "react";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { AboutPage } from "@/features/about";
import { CataloguesPage } from "@/features/catalogues";
import { resolveCataloguePath } from "@/features/catalogue-registry";
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
import { ProductsOverview } from "@/features/products/products-overview";
import { ProcurementSupportPage } from "@/features/procurement-support";
import { SearchDefaultPage } from "@/features/search-preview";

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
  | "placeholder"
  | "not-found";

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
  if (segments[0] !== "products") return "placeholder";

  const catalogueResult = resolveCataloguePath(segments);
  if (catalogueResult.kind === "family") return "family";
  if (catalogueResult.kind === "product") return "product";
  return "not-found";
}

export function resolvePublicPage({
  key,
  path,
  title
}: {
  key: string;
  path: string;
  title: string;
}): ReactNode | null {
  const kind = resolvePublicPageKind(key);
  const segments = key.split("/").filter(Boolean);

  switch (kind) {
    case "homepage":
      return <Homepage />;
    case "products":
      return <ProductsOverview />;
    case "catalogues":
      return <CataloguesPage />;
    case "inquiry-empty":
      return <InquiryPage />;
    case "quotation-blocked":
      return <QuotationPage />;
    case "about":
      return <AboutPage />;
    case "procurement-support":
      return <ProcurementSupportPage />;
    case "contact-static":
      return <ContactPage />;
    case "search-default":
      return <SearchDefaultPage />;
    case "privacy-template":
      return <LegalPage document={PRIVACY_DOCUMENT} />;
    case "terms-template":
      return <LegalPage document={TERMS_DOCUMENT} />;
    case "family":
      return <FamilyListingPage familySlug={segments[1] ?? ""} />;
    case "product":
      return (
        <ProductDetailPage
          familySlug={segments[1] ?? ""}
          productSlug={segments[2] ?? ""}
        />
      );
    case "placeholder":
      return <RoutePlaceholder eyebrow="Public route" title={title} path={path} />;
    case "not-found":
      return null;
  }
}
