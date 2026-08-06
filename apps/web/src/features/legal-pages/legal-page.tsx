import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import type { LegalDocumentRecord } from "./legal-document-model";
import { LegalSectionNavigation } from "./legal-section-navigation";
import { LegalSection } from "./legal-section";
import type { PublicLocale } from "@/features/localization/locales";
import { localizeLegalDocument } from "./legal-document-ar";
import { LocaleLink } from "@/features/localization/locale-link";

export function LegalPage({
  document,
  locale = "en"
}: {
  document: LegalDocumentRecord;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const localizedDocument = ar ? localizeLegalDocument(document) : document;
  return (
    <>
      <Section tone="paper" spacing="compact" className="legal-page__hero">
        <Container size="wide">
          <Reveal direction="up" className="legal-page__hero-reveal">
            <nav className="public-breadcrumbs" aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
              <LocaleLink href="/">{ar ? "الرئيسية" : "Home"}</LocaleLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{localizedDocument.breadcrumbLabel}</span>
            </nav>
            <p className="page-eyebrow">{ar ? "سياسة الموقع" : "Website policy"}</p>
            <h1>{localizedDocument.title}</h1>
            <p className="legal-page__warning">{localizedDocument.introduction}</p>
            <p className="legal-page__updated">
              {ar ? "آخر تحديث" : "Last updated"}: {localizedDocument.updated}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="legal-page">
        <Container size="wide">
          <div className="legal-page__layout">
            <LegalSectionNavigation document={localizedDocument} />
            <div className="legal-page__content">
              {localizedDocument.sections.map((section, index) => index === 0 ? (
                <Reveal direction="up" key={section.id} className="legal-section-reveal">
                  <LegalSection section={section} />
                </Reveal>
              ) : (
                <LegalSection key={section.id} section={section} />
              ))}
              <aside className="legal-page__review-note" aria-label="Policy contact">
                <p className="page-eyebrow">{ar ? "التواصل" : "Contact"}</p>
                <h2>{ar ? "هل لديك سؤال حول هذه السياسة؟" : "Questions about this policy?"}</h2>
                <p>{ar ? "استخدم صفحة التواصل وأضف مرجع الإرسال أو عرض السعر عند توفره." : "Use the contact page and include the relevant submission or quotation reference when available."}</p>
                <LocaleLink className="premium-link" href="/contact">{ar ? "اتصل بروزا ←" : "Contact Rosa →"}</LocaleLink>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
