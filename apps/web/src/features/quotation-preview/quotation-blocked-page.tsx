import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";

export function QuotationBlockedPage(): ReactElement {
  return (
    <Section tone="paper" className="quotation-blocked-page">
      <Container size="reading">
        <p className="quotation-blocked-page__eyebrow">Request quotation</p>
        <h1>Select instruments before requesting a quotation.</h1>
        <p>
          Contact details and procurement notes are collected after an inquiry
          list contains at least one instrument. No submission is available
          from an empty request.
        </p>
        <div className="quotation-blocked-page__actions">
          <ButtonLink href="/products">Browse products</ButtonLink>
          <ButtonLink href="/catalogues" variant="secondary">
            View catalogues
          </ButtonLink>
          <ButtonLink href="/inquiry" variant="quiet">
            Review inquiry
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
