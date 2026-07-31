import type { ReactElement } from "react";
import { HOME_PAGE_MODEL } from "./homepage.data";
import { HomeHero } from "./sections/home-hero";
import { FamilyDiscovery } from "./sections/family-discovery";
import { ProcurementSupport } from "./sections/procurement-support";
import { FeaturedInstruments } from "./sections/featured-instruments";
import { CatalogueAccess } from "./sections/catalogue-access";
import { QuotationCta } from "./sections/quotation-cta";

export function Homepage(): ReactElement {
  return (
    <div className="public-page public-page--home">
      <HomeHero model={HOME_PAGE_MODEL.hero} />
      <FamilyDiscovery intro={HOME_PAGE_MODEL.familyIntro} families={HOME_PAGE_MODEL.families} />
      <ProcurementSupport model={HOME_PAGE_MODEL.procurement} />
      <FeaturedInstruments intro={HOME_PAGE_MODEL.productsIntro} products={HOME_PAGE_MODEL.products} />
      <CatalogueAccess model={HOME_PAGE_MODEL.catalogue} />
      <QuotationCta model={HOME_PAGE_MODEL.quotation} />
    </div>
  );
}
