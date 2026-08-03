import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { MediaFrame, Reveal, TextReveal } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { ContactFormPreview } from "./contact-form-preview";
import { ContactInformationPanel } from "./contact-information-panel";

export function ContactPage(): ReactElement {
  const introduction = PUBLIC_CONTENT_VALUES.contactIntroduction;

  return (
    <div className="contact-page">
      <Section tone="paper" spacing="compact" className="contact-hero">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Contact</span>
            </nav>
          </Reveal>
          <div className="contact-hero__copy">
            <Reveal direction="up">
              <p className="page-eyebrow">{introduction.eyebrow}</p>
            </Reveal>
            <TextReveal as="h1" text={introduction.title} mode="words" delay={0.05} />
            <Reveal direction="up" delay={0.13}>
              <p>{introduction.copy}</p>
            </Reveal>
            <Reveal direction="up" delay={0.18}>
              <ButtonLink href="/inquiry" variant="secondary">
                Open Product Inquiry
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="contact-main-section">
        <Container size="wide">
          <div className="contact-main-layout">
            <Reveal direction="up" className="contact-information-reveal">
              <ContactInformationPanel />
            </Reveal>
            <Reveal direction="up" delay={0.06} className="contact-form-reveal">
              <div className="contact-form-region">
                <header className="f3d-section-heading">
                  <p className="page-eyebrow">General contact form</p>
                  <h2>Tell us how we can help.</h2>
                  <p>For product quantities or quotation requests, use the product inquiry instead.</p>
                </header>
                <ContactFormPreview />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="contact-location-section">
        <Container size="wide">
          <Reveal direction="up">
            <MediaFrame
              alt="Location awaiting client confirmation"
              aspect="landscape"
              tone="mist"
              mediaSlot="contact-location"
              className="contact-location-placeholder story-media-frame"
            >
              <ProductMediaPlaceholder
                label="Location awaiting confirmation"
                decorative
                className="story-media-frame__placeholder"
              />
            </MediaFrame>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="contact-quotation-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-final-cta">
              <div>
                <p className="page-eyebrow">Product quotations</p>
                <h2>Need a quotation for specific instruments?</h2>
                <p>Use the product inquiry with codes, options and quantities instead of a general message.</p>
              </div>
              <ButtonLink href="/inquiry">Open Product Inquiry</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
