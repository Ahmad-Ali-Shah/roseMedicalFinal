import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui";

export interface QuotationSuccessResult {
  reference?: string;
  email?: string;
}

export function QuotationSuccessPreview({
  result
}: {
  result?: QuotationSuccessResult;
}): ReactElement {
  const hasSubmittedResult = Boolean(result?.reference || result?.email);

  return (
    <section
      className="quotation-success-preview"
      aria-labelledby="quotation-success-title"
      data-preview-only="true"
    >
      <div>
        <p className="quotation-success-preview__eyebrow">
          {hasSubmittedResult ? "Request submitted" : "Success-state preview"}
        </p>
        <h2 id="quotation-success-title">
          {hasSubmittedResult
            ? "Your quotation request has been received."
            : "Quotation confirmation appears here after submission."}
        </h2>
        {result?.reference ? <p>Reference: {result.reference}</p> : null}
        {result?.email ? (
          <p>A confirmation email was sent to {result.email}.</p>
        ) : (
          <p>No request, reference or email delivery is represented in this static preview.</p>
        )}
        <div className="quotation-success-preview__actions">
          <ButtonLink href="/products">Return to products</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Return home
          </ButtonLink>
        </div>
      </div>
      <div className="quotation-success-preview__mark" aria-hidden="true">
        ✓
      </div>
    </section>
  );
}
