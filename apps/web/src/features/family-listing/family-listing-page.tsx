import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { getPublicCatalogueProducts } from "@/features/catalogue-live";
import { createFamilyListingData } from "./family-listing.data";
import { FamilyHero } from "./family-hero";
import { FamilyProductDiscovery } from "./family-product-discovery";
import { FamilySupportPanel } from "./family-support-panel";
import type { PublicLocale } from "@/features/localization/locales";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import { LocaleLink } from "@/features/localization/locale-link";

export async function FamilyListingPage({
  familySlug,
  locale = "en"
}: {
  familySlug: string;
  locale?: PublicLocale;
}): Promise<ReactElement | null> {
  const products = await getPublicCatalogueProducts();
  const data = createFamilyListingData(familySlug, products);
  if (!data) return null;
  const ar = locale === "ar";
  const family = ar ? {
    ...data.family,
    name: FAMILY_NAMES_AR[data.family.slug],
    introduction: `أدوات ${FAMILY_NAMES_AR[data.family.slug]} منظمة حسب رمز المنتج والمقاس والخيارات المدرجة لتسهيل إعداد طلب عرض السعر.`,
    catalogueLabel: `كتالوج ${FAMILY_NAMES_AR[data.family.slug]}`
  } : data.family;

  return (
    <div className="public-page public-page--family">
      <Section tone="paper" spacing="compact" className="family-page-intro">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
            <LocaleLink href="/products">{ar ? "المنتجات" : "Products"}</LocaleLink><span aria-hidden="true">/</span><span>{family.name}</span>
          </nav>
          <FamilyHero family={family} countLabel={ar ? `${data.products.length} منتج` : data.countLabel} locale={locale} />
        </Container>
      </Section>

      <Section tone="paper" spacing="compact">
        <Container size="wide">
          <FamilyProductDiscovery
            family={family}
            products={data.products}
            searchLabel={ar ? `ابحث ضمن ${family.name}` : data.searchLabel}
            locale={locale}
          />
        </Container>
      </Section>

      <Section tone="paper" className="family-support-section">
        <Container size="wide"><FamilySupportPanel locale={locale} /></Container>
      </Section>
    </div>
  );
}
