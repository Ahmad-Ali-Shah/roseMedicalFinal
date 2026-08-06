import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { MediaFrame, Reveal, TextReveal } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { PROCUREMENT_SUPPORT_MEDIA } from "@/features/public-media";
import { LocaleLink, LocalizedButtonLink, type PublicLocale } from "@/features/localization";
import { InformationChecklist } from "./information-checklist";
import { ProcurementProcess } from "./procurement-process";
import { RequirementTypes } from "./requirement-types";

export function ProcurementSupportPage({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  const introduction = ar
    ? {
        eyebrow: "دعم المشتريات",
        title: "حوّل متطلبات الأدوات إلى طلب منظم.",
        copy: "استعرض العائلات والرموز والخيارات، ثم اجمع الكميات والملاحظات وبيانات التواصل في مسار واحد واضح لطلب عرض السعر."
      }
    : PUBLIC_CONTENT_VALUES.procurementIntroduction;

  return (
    <>
      <Section tone="paper" spacing="compact" className="f3d-hero procurement-support-hero">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
              <LocaleLink href="/">{ar ? "الرئيسية" : "Home"}</LocaleLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{ar ? "دعم المشتريات" : "Procurement Support"}</span>
            </nav>
          </Reveal>
          <div className="f3d-hero__layout">
            <div className="f3d-hero__copy">
              <Reveal direction="up">
                <p className="page-eyebrow">{introduction.eyebrow}</p>
              </Reveal>
              <TextReveal as="h1" text={introduction.title} mode="words" delay={0.06} />
              <Reveal direction="up" delay={0.14}>
                <p>{introduction.copy}</p>
              </Reveal>
            </div>
            <Reveal direction="up" delay={0.08} className="story-hero-media-reveal">
              <MediaFrame
                src={PROCUREMENT_SUPPORT_MEDIA.src}
                alt={ar ? "فريق يراجع معلومات المشتريات" : PROCUREMENT_SUPPORT_MEDIA.alt}
                aspect="portrait"
                focalPoint={PROCUREMENT_SUPPORT_MEDIA.focalPoint}
                fit={PROCUREMENT_SUPPORT_MEDIA.fit}
                tone="dark"
                overlay="dark"
                mediaSlot="procurement-support-hero"
                className="f3d-hero__media story-media-frame"
                sizes="(max-width: 768px) 100vw, 38vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="procurement-process-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">{ar ? "المسار" : "The process"}</p>
              <h2>{ar ? "ست خطوات عملية." : "Six practical steps."}</h2>
            </header>
          </Reveal>
          <ProcurementProcess locale={locale} />
        </Container>
      </Section>

      <Section tone="paper" className="requirement-types-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">{ar ? "أنواع المتطلبات الشائعة" : "Common requirement types"}</p>
              <h2>{ar ? "طلبات مختلفة، ومسار واحد منظم." : "Different requests, one organised process."}</h2>
            </header>
          </Reveal>
          <RequirementTypes locale={locale} />
        </Container>
      </Section>

      <Section tone="warm" className="information-checklist-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="information-checklist-panel">
              <header className="f3d-section-heading f3d-section-heading--inverse">
                <p className="page-eyebrow">{ar ? "معلومات تساعد" : "Information that helps"}</p>
                <h2>{ar ? "تفاصيل تجعل مراجعة المتطلبات أسهل." : "Details that make a requirement easier to review."}</h2>
              </header>
              <InformationChecklist locale={locale} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" className="procurement-routes-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-feature-panel procurement-routes-panel" data-procurement-route-panel="true">
              <div>
                <p className="page-eyebrow">{ar ? "اختر المسار" : "Choose a route"}</p>
                <h2>{ar ? "تابع باستخدام المعلومات المتوفرة لديك." : "Continue with the information you already have."}</h2>
                <p>{ar ? "استعرض المنتجات المدرجة، أو راجع الاستفسار، أو أرسل رسالة أعمال عامة." : "Browse listed products, review the inquiry state, or send a general business message."}</p>
                <div className="f3d-action-row">
                  <LocalizedButtonLink href="/products">{ar ? "استعرض المنتجات" : "Browse Products"}</LocalizedButtonLink>
                  <LocalizedButtonLink href="/inquiry" variant="secondary">{ar ? "افتح الاستفسار" : "Open Inquiry"}</LocalizedButtonLink>
                  <LocalizedButtonLink href="/contact" variant="secondary">{ar ? "اتصل بروزا" : "Contact Rosa"}</LocalizedButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="f3d-final-cta-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-final-cta">
              <div>
                <p className="page-eyebrow">{ar ? "دعم المشتريات" : "Procurement Support"}</p>
                <h2>{ar ? "هل بيانات المنتجات جاهزة؟" : "Have the product details ready?"}</h2>
                <p>{ar ? "افتح مسار عرض السعر لمراجعة التفاصيل وإرسال طلبك." : "Open the quotation path to review the details and submit your request."}</p>
              </div>
              <LocalizedButtonLink href="/request-quotation">{ar ? "اطلب عرض سعر" : "Request a Quote"}</LocalizedButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
