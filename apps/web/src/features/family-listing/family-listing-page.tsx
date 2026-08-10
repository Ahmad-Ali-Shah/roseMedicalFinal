import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { getFamilyCatalogueProducts } from "@/features/catalogue-live";
import { createFamilyListingData } from "./family-listing.data";
import { FamilyHero } from "./family-hero";
import { FamilyProductDiscovery } from "./family-product-discovery";
import { FamilySupportPanel } from "./family-support-panel";
import type { PublicLocale } from "@/features/localization/locales";
import { LocaleLink } from "@/features/localization/locale-link";
import { createClient } from "@/lib/supabase/server";

export async function FamilyListingPage({
  familySlug,
  locale = "en"
}: {
  familySlug: string;
  locale?: PublicLocale;
}): Promise<ReactElement | null> {
  const supabase = await createClient();
  const [products, categoryResult, introductionResult] = await Promise.all([
    getFamilyCatalogueProducts(familySlug),
    supabase.from("categories").select("name_en,name_ar").eq("slug", familySlug).maybeSingle(),
    supabase.from("site_settings").select("value_en").eq("key", `family_introduction_${familySlug}`).maybeSingle()
  ]);
  const data = createFamilyListingData(familySlug, products);
  if (!data) return null;
  const ar = locale === "ar";
  const liveName = categoryResult.data?.name_en?.trim() || data.family.name;
  const liveNameAr = categoryResult.data?.name_ar?.trim() || liveName;
  const liveIntroduction = introductionResult.data?.value_en?.trim() || data.family.introduction;
  const family = ar ? {
    ...data.family,
    name: liveNameAr,
    introduction: `أدوات ${liveNameAr} منظمة حسب رمز المنتج والمقاس والخيارات المدرجة لتسهيل إعداد طلب عرض السعر.`,
    catalogueLabel: `كتالوج ${liveNameAr}`
  } : {
    ...data.family,
    name: liveName,
    introduction: liveIntroduction,
    catalogueLabel: `${liveName} catalogue`
  };

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
