import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { ContactFormPreview } from "./contact-form-preview";
import { ContactInformationPanel } from "./contact-information-panel";

export function ContactPage(): ReactElement {
  return (
    <>
      <Section tone="paper" spacing="compact" className="contact-hero">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <div className="contact-hero__copy">
            <p className="page-eyebrow">Contact Rosa</p>
            <h1>Send a general business message.</h1>
            <p>
              Use this page for company, catalogue or support questions. Product
              quotation requests belong in the inquiry flow so product details remain
              attached.
            </p>
            <ButtonLink href="/inquiry" variant="secondary">
              Open Product Inquiry
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="warm" className="contact-main-section">
        <Container size="wide">
          <div className="contact-main-layout">
            <ContactInformationPanel />
            <div className="contact-form-region">
              <header className="f3d-section-heading">
                <p className="page-eyebrow">General contact form</p>
                <h2>Tell us how we can help.</h2>
                <p>For product quantities or quotation requests, use the product inquiry instead.</p>
              </header>
              <ContactFormPreview />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="contact-location-section">
        <Container size="wide">
          <ProductMediaPlaceholder
            label="Location awaiting confirmation"
            aspect="landscape"
            className="contact-location-placeholder"
          />
        </Container>
      </Section>

      <Section tone="warm" className="contact-quotation-section">
        <Container size="wide">
          <div className="f3d-final-cta">
            <div>
              <p className="page-eyebrow">Product quotations</p>
              <h2>Need a quotation for specific instruments?</h2>
              <p>Use the product inquiry with codes, options and quantities instead of a general message.</p>
            </div>
            <ButtonLink href="/inquiry">Open Product Inquiry</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
