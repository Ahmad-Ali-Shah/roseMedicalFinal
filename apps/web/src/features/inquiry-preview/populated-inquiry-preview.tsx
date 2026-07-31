import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";
import { GeneralRequestPreview } from "./general-request-preview";
import { InquiryLinePreview } from "./inquiry-line-preview";
import {
  INQUIRY_PREVIEW_LINES,
  getInquiryPreviewTotals
} from "./inquiry-preview-model";
import { InquirySummaryPreview } from "./inquiry-summary-preview";

export function PopulatedInquiryPreview(): ReactElement {
  const totals = getInquiryPreviewTotals();

  return (
    <div className="populated-inquiry-preview" data-preview-only="true">
      <Section tone="paper" spacing="compact" className="inquiry-preview-intro">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Inquiry</span>
          </nav>
          <div className="inquiry-preview-intro__heading">
            <div>
              <p className="inquiry-preview-intro__eyebrow">Quotation inquiry</p>
              <h1>Review your instrument inquiry.</h1>
              <p>
                This is a product requirement list, not a shopping cart. The
                controls remain read-only until inquiry behavior is activated.
              </p>
              <strong>
                {totals.uniqueProducts} unique products · {totals.totalQuantity}{" "}
                total instruments
              </strong>
            </div>
            <ButtonLink href="/products" variant="secondary">
              Continue browsing
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section tone="paper" className="inquiry-preview-content">
        <Container size="wide">
          <div className="inquiry-preview-layout">
            <div className="inquiry-preview-lines">
              {INQUIRY_PREVIEW_LINES.map((line) => (
                <InquiryLinePreview key={line.id} line={line} />
              ))}
            </div>
            <InquirySummaryPreview totals={totals} />
          </div>
          <GeneralRequestPreview />
        </Container>
      </Section>
    </div>
  );
}
