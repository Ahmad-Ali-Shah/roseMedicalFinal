import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { FamilyIndex } from "@/features/public-editorial";
import { BuyerExpectations } from "./buyer-expectations";
import { SupportedBuyers } from "./supported-buyers";

export function AboutPage(): ReactElement {
  return (
    <>
      <Section tone="paper" spacing="compact" className="f3d-hero about-hero">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About</span>
          </nav>
          <div className="f3d-hero__layout">
            <div className="f3d-hero__copy">
              <p className="page-eyebrow">About Rosa</p>
              <h1>A clearer way to source medical instruments.</h1>
              <p>
                Rosa supports professional buyers with organised product information,
                catalogue access and structured quotation requests.
              </p>
            </div>
            <ProductMediaPlaceholder
              label="Replaceable Rosa editorial image"
              aspect="portrait"
              className="f3d-hero__media"
            />
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="about-expectations-section">
        <Container size="wide">
          <header className="f3d-section-heading">
            <p className="page-eyebrow">What buyers can expect</p>
            <h2>Useful structure at every step.</h2>
          </header>
          <BuyerExpectations />
        </Container>
      </Section>

      <Section tone="paper" className="about-buyers-section">
        <Container size="wide">
          <header className="f3d-section-heading">
            <p className="page-eyebrow">Who we support</p>
            <h2>Built around professional buying needs.</h2>
          </header>
          <SupportedBuyers />
        </Container>
      </Section>

      <Section tone="warm" className="about-family-section">
        <Container size="wide">
          <header className="f3d-section-heading">
            <p className="page-eyebrow">Product families</p>
            <h2>Browse the catalogue by family.</h2>
          </header>
          <FamilyIndex />
        </Container>
      </Section>

      <Section tone="paper" className="about-procurement-section">
        <Container size="wide">
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
            <ProductMediaPlaceholder
              label="Replaceable procurement process image"
              className="f3d-feature-panel__media"
            />
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="f3d-final-cta-section">
        <Container size="wide">
          <div className="f3d-final-cta">
            <div>
              <p className="page-eyebrow">Next step</p>
              <h2>Ready to prepare an inquiry?</h2>
              <p>Browse the instrument catalogue or open the quotation-request path.</p>
            </div>
            <ButtonLink href="/request-quotation">Request a Quote</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
