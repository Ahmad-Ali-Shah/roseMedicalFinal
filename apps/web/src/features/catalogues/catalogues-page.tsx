import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal, TextReveal } from "@/features/motion";
import { CatalogueGrid } from "./catalogue-grid";
import { CatalogueGuidance } from "./catalogue-guidance";
import type { PublicLocale } from "@/features/localization/locales";
import { LocaleLink } from "@/features/localization/locale-link";

export function CataloguesPage({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <>
      <Section tone="paper" spacing="compact" className="catalogues-intro">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
              <LocaleLink href="/">{ar ? "الرئيسية" : "Home"}</LocaleLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{ar ? "الكتالوجات" : "Catalogues"}</span>
            </nav>
          </Reveal>
          <Reveal direction="up">
            <p className="catalogues-intro__eyebrow">{ar ? "الكتالوجات التقنية" : "Technical catalogues"}</p>
          </Reveal>
          <TextReveal
            as="h1"
            text={ar ? "استعراض عبر الوثائق، متصل بتجربة المنتجات." : "Document-led browsing, connected to the product experience."}
            mode="words"
            delay={0.05}
          />
          <Reveal direction="up" delay={0.14}>
            <p className="catalogues-intro__copy">
              {ar ? "استخدم كتالوجات روزا لمراجعة عائلات الأدوات والرموز والخيارات المدرجة. تبقى كل وثيقة متصلة بعائلتها على الموقع لإعداد الاستفسار." : "Use Rosa catalogues to review instrument families, codes and listed configurations. Each document remains connected to its web family for inquiry preparation."}
            </p>
          </Reveal>
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-content">
        <Container size="wide">
          <CatalogueGrid locale={locale} />
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-guidance-section">
        <Container size="wide">
          <Reveal direction="up">
            <CatalogueGuidance locale={locale} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
