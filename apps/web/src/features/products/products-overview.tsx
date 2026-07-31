import type { ReactElement } from "react";
import { PRODUCTS_PAGE_MODEL } from "./products.data";
import { ProductsHero } from "./sections/products-hero";
import { DiscoveryToolbarShell } from "./sections/discovery-toolbar-shell";
import { FamilyIndex } from "./sections/family-index";
import { ProductPreviewGrid } from "./sections/product-preview-grid";
import { CatalogueSupport } from "./sections/catalogue-support";
import { ProductsProcurementCta } from "./sections/products-procurement-cta";

export function ProductsOverview(): ReactElement {
  return (
    <div className="public-page public-page--products">
      <ProductsHero model={PRODUCTS_PAGE_MODEL.hero} />
      <DiscoveryToolbarShell model={PRODUCTS_PAGE_MODEL.discovery} />
      <FamilyIndex intro={PRODUCTS_PAGE_MODEL.familyIntro} families={PRODUCTS_PAGE_MODEL.families} />
      <ProductPreviewGrid intro={PRODUCTS_PAGE_MODEL.productsIntro} products={PRODUCTS_PAGE_MODEL.products} />
      <CatalogueSupport model={PRODUCTS_PAGE_MODEL.catalogue} />
      <ProductsProcurementCta model={PRODUCTS_PAGE_MODEL.procurement} />
    </div>
  );
}
