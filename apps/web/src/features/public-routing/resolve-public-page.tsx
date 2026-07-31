import type { ReactNode } from "react";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { Homepage } from "@/features/homepage/homepage";
import { ProductsOverview } from "@/features/products/products-overview";
import { resolveCataloguePath } from "@/features/catalogue-registry";
import { FamilyListingPage } from "@/features/family-listing/family-listing-page";
import { ProductDetailPage } from "@/features/product-detail/product-detail-page";

export type PublicPageKind =
  | "homepage"
  | "products"
  | "family"
  | "product"
  | "placeholder"
  | "not-found";

const NON_CATALOGUE_PLACEHOLDERS = new Set([
  "catalogues",
  "about",
  "procurement-support",
  "contact",
  "search",
  "inquiry",
  "request-quotation",
  "privacy",
  "terms"
]);

export function resolvePublicPageKind(key: string): PublicPageKind {
  if (key === "") return "homepage";
  if (key === "products") return "products";
  if (NON_CATALOGUE_PLACEHOLDERS.has(key)) return "placeholder";

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
