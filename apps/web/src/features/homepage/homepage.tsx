import type { ReactElement } from "react";
import { getPublicCatalogueProducts } from "@/features/catalogue-live";
import { createHomePageModel } from "./homepage.data";
import type { PublicLocale } from "@/features/localization";
import { HomeHero } from "./sections/home-hero";
import { FamilyDiscovery } from "./sections/family-discovery";
import { ProcurementSupport } from "./sections/procurement-support";
import { FeaturedInstruments } from "./sections/featured-instruments";
import { CatalogueAccess } from "./sections/catalogue-access";
import { QuotationCta } from "./sections/quotation-cta";

export async function Homepage({ locale = "en" }: { locale?: PublicLocale }): Promise<ReactElement> {
  const products = await getPublicCatalogueProducts();
  const model = createHomePageModel(products, locale);
  return (
    <div className="public-page public-page--home">
      <HomeHero model={model.hero} locale={locale} />
      <FamilyDiscovery intro={model.familyIntro} families={model.families} locale={locale} />
      <ProcurementSupport model={model.procurement} locale={locale} />
      <FeaturedInstruments intro={model.productsIntro} products={model.products} />
      <CatalogueAccess model={model.catalogue} locale={locale} />
      <QuotationCta model={model.quotation} />
    </div>
  );
}
