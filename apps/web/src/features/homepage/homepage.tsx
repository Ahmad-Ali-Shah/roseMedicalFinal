import type { ReactElement } from "react";
import { HOME_PAGE_MODEL } from "./homepage.data";
import { HOME_PAGE_MODEL_AR, type PublicLocale } from "@/features/localization";
import { HomeHero } from "./sections/home-hero";
import { FamilyDiscovery } from "./sections/family-discovery";
import { ProcurementSupport } from "./sections/procurement-support";
import { FeaturedInstruments } from "./sections/featured-instruments";
import { CatalogueAccess } from "./sections/catalogue-access";
import { QuotationCta } from "./sections/quotation-cta";

export function Homepage({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const model = locale === "ar" ? HOME_PAGE_MODEL_AR : HOME_PAGE_MODEL;
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
