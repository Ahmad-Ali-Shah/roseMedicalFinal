import type { ReactElement } from "react";
import { PRODUCTS_PAGE_MODEL, PRODUCTS_PAGE_MODEL_AR, type ProductsPageModel } from "./products.data";
import type { PublicLocale } from "@/features/localization";
import { ProductsHero } from "./sections/products-hero";
import { DiscoveryToolbarShell } from "./sections/discovery-toolbar-shell";
import { FamilyIndex } from "./sections/family-index";
import { ProductPreviewGrid } from "./sections/product-preview-grid";
import { CatalogueSupport } from "./sections/catalogue-support";
import { ProductsProcurementCta } from "./sections/products-procurement-cta";

export function ProductsOverview({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const model: ProductsPageModel = locale === "ar" ? PRODUCTS_PAGE_MODEL_AR : PRODUCTS_PAGE_MODEL;
  return (
    <div className="public-page public-page--products">
      <ProductsHero model={model.hero} />
      <DiscoveryToolbarShell model={model.discovery} />
      <FamilyIndex intro={model.familyIntro} families={model.families} locale={locale} />
      <ProductPreviewGrid intro={model.productsIntro} products={model.products} />
      <CatalogueSupport model={model.catalogue} />
      <ProductsProcurementCta model={model.procurement} />
    </div>
  );
}
