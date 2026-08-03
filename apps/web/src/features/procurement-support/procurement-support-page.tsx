import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { MediaFrame, Reveal, TextReveal } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { InformationChecklist } from "./information-checklist";
import { ProcurementProcess } from "./procurement-process";
import { RequirementTypes } from "./requirement-types";

export function ProcurementSupportPage(): ReactElement {
  const introduction = PUBLIC_CONTENT_VALUES.procurementIntroduction;

  return (
    <>
      <Section tone="paper" spacing="compact" className="f3d-hero procurement-support-hero">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Procurement Support</span>
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
                alt="Procurement support image reserved for final approved photography"
                aspect="portrait"
                tone="light"
                overlay="soft"
                mediaSlot="procurement-support-hero"
                className="f3d-hero__media story-media-frame"
              >
                <ProductMediaPlaceholder
                  label="Replaceable procurement support image"
                  aspect="portrait"
                  decorative
                  className="story-media-frame__placeholder"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="procurement-process-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">The process</p>
              <h2>Six practical steps.</h2>
            </header>
          </Reveal>
          <ProcurementProcess />
        </Container>
      </Section>

      <Section tone="paper" className="requirement-types-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">Common requirement types</p>
              <h2>Different requests, one organised process.</h2>
            </header>
          </Reveal>
          <RequirementTypes />
        </Container>
      </Section>

      <Section tone="warm" className="information-checklist-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="information-checklist-panel">
              <header className="f3d-section-heading f3d-section-heading--inverse">
                <p className="page-eyebrow">Information that helps</p>
                <h2>Details that make a requirement easier to review.</h2>
              </header>
              <InformationChecklist />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" className="procurement-routes-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-feature-panel procurement-routes-panel">
              <div>
                <p className="page-eyebrow">Choose a route</p>
                <h2>Continue with the information you already have.</h2>
                <p>Browse listed products, review the inquiry state, or send a general business message.</p>
                <div className="f3d-action-row">
                  <ButtonLink href="/products">Browse Products</ButtonLink>
                  <ButtonLink href="/inquiry" variant="secondary">Open Inquiry</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">Contact Rosa</ButtonLink>
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
                <p className="page-eyebrow">Procurement Support</p>
                <h2>Have the product details ready?</h2>
                <p>Open the quotation path to review what is required before submission becomes active.</p>
              </div>
              <ButtonLink href="/request-quotation">Request a Quote</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
