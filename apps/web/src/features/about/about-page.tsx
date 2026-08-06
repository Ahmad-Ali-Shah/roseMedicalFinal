import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { MediaFrame, Reveal, TextReveal } from "@/features/motion";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { PROCUREMENT_SUPPORT_MEDIA, ROSA_LOGO_MEDIA } from "@/features/public-media";
import { FamilyIndex } from "@/features/public-editorial";
import { LocaleLink, LocalizedButtonLink, type PublicLocale } from "@/features/localization";
import { CompanyProfile } from "./company-profile";
import { SupportedBuyers } from "./supported-buyers";

export function AboutPage({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  const introduction = ar
    ? {
        eyebrow: "عن روزا ميديكال",
        title: "وضوح أكبر لاختيار الأدوات الطبية.",
        copy: "تنظم روزا ميديكال معلومات الأدوات والكتالوجات ومسار طلب عروض الأسعار لمساعدة فرق المشتريات والموزعين على إعداد متطلبات دقيقة."
      }
    : PUBLIC_CONTENT_VALUES.aboutIntroduction;

  return (
    <>
      <Section tone="paper" spacing="compact" className="f3d-hero about-hero">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
              <LocaleLink href="/">{ar ? "الرئيسية" : "Home"}</LocaleLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{ar ? "من نحن" : "About"}</span>
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
                src={ROSA_LOGO_MEDIA.src}
                alt={ar ? "شعار روزا ميديكال" : ROSA_LOGO_MEDIA.alt}
                aspect="square"
                focalPoint={ROSA_LOGO_MEDIA.focalPoint}
                fit={ROSA_LOGO_MEDIA.fit}
                tone="light"
                mediaSlot="about-hero"
                className="f3d-hero__media story-media-frame story-media-frame--brand story-media-frame--brand-unframed"
                sizes="(max-width: 768px) 100vw, 38vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="about-company-section">
        <Container size="wide">
          <CompanyProfile locale={locale} />
        </Container>
      </Section>

      <Section tone="paper" className="about-buyers-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">{ar ? "من ندعم" : "Who we support"}</p>
              <h2>{ar ? "مصمم لتلبية احتياجات الشراء المهني." : "Built around professional buying needs."}</h2>
            </header>
          </Reveal>
          <SupportedBuyers locale={locale} />
        </Container>
      </Section>

      <Section tone="warm" className="about-family-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">{ar ? "عائلات المنتجات" : "Product families"}</p>
              <h2>{ar ? "استعرض الكتالوج حسب العائلة." : "Browse the catalogue by family."}</h2>
            </header>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <FamilyIndex locale={locale} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" className="about-procurement-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-feature-panel about-procurement-preview">
              <div>
                <p className="page-eyebrow">{ar ? "دعم المشتريات" : "Procurement Support"}</p>
                <h2>{ar ? "من اكتشاف المنتج إلى طلب عرض سعر مكتمل." : "From product discovery to a complete quotation request."}</h2>
                <p>
                  {ar
                    ? "راجع الرموز والخيارات، وحدد الكميات، وأضف الملاحظات، ثم نظّم طلبًا واحدًا للمتابعة."
                    : "Review codes and options, prepare quantities, add notes and organise one request for follow-up."}
                </p>
                <div className="f3d-action-row">
                  <LocalizedButtonLink href="/procurement-support" variant="secondary">
                    {ar ? "عرض دعم المشتريات" : "View Procurement Support"}
                  </LocalizedButtonLink>
                  <LocalizedButtonLink href="/products">{ar ? "استعرض المنتجات" : "Browse Products"}</LocalizedButtonLink>
                </div>
              </div>
              <MediaFrame
                src={PROCUREMENT_SUPPORT_MEDIA.src}
                alt={ar ? "فريق يراجع معلومات المشتريات" : PROCUREMENT_SUPPORT_MEDIA.alt}
                aspect="landscape"
                focalPoint={PROCUREMENT_SUPPORT_MEDIA.focalPoint}
                fit={PROCUREMENT_SUPPORT_MEDIA.fit}
                tone="dark"
                overlay="dark"
                mediaSlot="about-procurement"
                className="f3d-feature-panel__media story-media-frame"
                sizes="(max-width: 768px) 100vw, 38vw"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="f3d-final-cta-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-final-cta">
              <div>
                <p className="page-eyebrow">{ar ? "الخطوة التالية" : "Next step"}</p>
                <h2>{ar ? "هل أنت جاهز لإعداد استفسار؟" : "Ready to prepare an inquiry?"}</h2>
                <p>{ar ? "استعرض كتالوج الأدوات أو ابدأ مسار طلب عرض السعر." : "Browse the instrument catalogue or open the quotation-request path."}</p>
              </div>
              <LocalizedButtonLink href="/request-quotation">{ar ? "اطلب عرض سعر" : "Request a Quote"}</LocalizedButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
