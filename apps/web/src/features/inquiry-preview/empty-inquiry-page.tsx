import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";

export function EmptyInquiryPage(): ReactElement {
  return (
    <Section tone="paper" className="empty-inquiry-page">
      <Container size="wide">
        <div className="empty-inquiry-page__layout">
          <div className="empty-inquiry-page__content">
            <p className="empty-inquiry-page__eyebrow">Empty inquiry</p>
            <h1>Your inquiry list is empty.</h1>
            <p>
              Browse an instrument family and select the products you want Rosa
              to review for quotation once inquiry behavior is activated.
            </p>
            <div className="empty-inquiry-page__actions">
              <ButtonLink href="/products">Browse products</ButtonLink>
              <ButtonLink href="/catalogues" variant="secondary">
                View catalogues
              </ButtonLink>
            </div>
          </div>
          <ProductMediaPlaceholder
            label="Empty inquiry instrument placeholder"
            decorative
            aspect="landscape"
            className="empty-inquiry-page__media"
          />
        </div>
      </Container>
    </Section>
  );
}
