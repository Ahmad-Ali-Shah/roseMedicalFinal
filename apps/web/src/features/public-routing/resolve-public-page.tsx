import type { ReactNode } from "react";
import { RoutePlaceholder } from "@/components/layout/route-placeholder";
import { Homepage } from "@/features/homepage/homepage";
import { ProductsOverview } from "@/features/products/products-overview";

export type PublicPageKind = "homepage" | "products" | "placeholder";

export function resolvePublicPageKind(key: string): PublicPageKind {
  if (key === "") return "homepage";
  if (key === "products") return "products";
  return "placeholder";
}

export function resolvePublicPage({
  key,
  path,
  title
}: {
  key: string;
  path: string;
  title: string;
}): ReactNode {
  switch (resolvePublicPageKind(key)) {
    case "homepage":
      return <Homepage />;
    case "products":
      return <ProductsOverview />;
    default:
      return <RoutePlaceholder eyebrow="Public route" title={title} path={path} />;
  }
}
