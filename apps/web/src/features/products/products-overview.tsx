import type { ReactElement } from "react";
import { getPublicCatalogueProducts } from "@/features/catalogue-live";
import { createProductsPageModel } from "./products.data";
import type { PublicLocale } from "@/features/localization";
import { ProductsHero } from "./sections/products-hero";
import { DiscoveryToolbarShell } from "./sections/discovery-toolbar-shell";
import { FamilyIndex } from "./sections/family-index";
import { ProductPreviewGrid } from "./sections/product-preview-grid";
import { CatalogueSupport } from "./sections/catalogue-support";
import { ProductsProcurementCta } from "./sections/products-procurement-cta";

export async function ProductsOverview({ locale = "en" }: { locale?: PublicLocale }): Promise<ReactElement> {
  const products = await getPublicCatalogueProducts();
  const model = createProductsPageModel(products, locale);
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
