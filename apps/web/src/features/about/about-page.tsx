import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { MediaFrame, Reveal, TextReveal } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { PUBLIC_CONTENT_VALUES } from "@/features/public-content-registry";
import { FamilyIndex } from "@/features/public-editorial";
import { BuyerExpectations } from "./buyer-expectations";
import { SupportedBuyers } from "./supported-buyers";

export function AboutPage(): ReactElement {
  const introduction = PUBLIC_CONTENT_VALUES.aboutIntroduction;

  return (
    <>
      <Section tone="paper" spacing="compact" className="f3d-hero about-hero">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About</span>
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
                alt="Rosa Medical editorial image reserved for final approved photography"
                aspect="portrait"
                tone="light"
                overlay="soft"
                mediaSlot="about-hero"
                className="f3d-hero__media story-media-frame"
              >
                <ProductMediaPlaceholder
                  label="Replaceable Rosa editorial image"
                  aspect="portrait"
                  decorative
                  className="story-media-frame__placeholder"
                />
              </MediaFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="about-expectations-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">What buyers can expect</p>
              <h2>Useful structure at every step.</h2>
            </header>
          </Reveal>
          <BuyerExpectations />
        </Container>
      </Section>

      <Section tone="paper" className="about-buyers-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">Who we support</p>
              <h2>Built around professional buying needs.</h2>
            </header>
          </Reveal>
          <SupportedBuyers />
        </Container>
      </Section>

      <Section tone="warm" className="about-family-section">
        <Container size="wide">
          <Reveal direction="up">
            <header className="f3d-section-heading">
              <p className="page-eyebrow">Product families</p>
              <h2>Browse the catalogue by family.</h2>
            </header>
          </Reveal>
          <Reveal direction="up" delay={0.06}>
            <FamilyIndex />
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" className="about-procurement-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-feature-panel about-procurement-preview">
              <div>
                <p className="page-eyebrow">Procurement Support</p>
                <h2>From product discovery to a complete quotation request.</h2>
                <p>
                  Review codes and options, prepare quantities, add notes and organise
                  one request for follow-up.
                </p>
                <div className="f3d-action-row">
                  <ButtonLink href="/procurement-support" variant="secondary">
                    View Procurement Support
                  </ButtonLink>
                  <ButtonLink href="/products">Browse Products</ButtonLink>
                </div>
              </div>
              <MediaFrame
                alt="Procurement process image reserved for final approved photography"
                aspect="landscape"
                tone="mist"
                overlay="soft"
                mediaSlot="about-procurement"
                className="f3d-feature-panel__media story-media-frame"
              >
                <ProductMediaPlaceholder
                  label="Replaceable procurement process image"
                  decorative
                  className="story-media-frame__placeholder"
                />
              </MediaFrame>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="f3d-final-cta-section">
        <Container size="wide">
          <Reveal direction="up">
            <div className="f3d-final-cta">
              <div>
                <p className="page-eyebrow">Next step</p>
                <h2>Ready to prepare an inquiry?</h2>
                <p>Browse the instrument catalogue or open the quotation-request path.</p>
              </div>
              <ButtonLink href="/request-quotation">Request a Quote</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
