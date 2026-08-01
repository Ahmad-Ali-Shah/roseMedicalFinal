import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui";

export interface ContactSuccessResult {
  reference?: string;
}

export function ContactSuccessPreview({
  result
}: {
  result?: ContactSuccessResult;
}): ReactElement {
  return (
    <section className="contact-success-preview" data-preview-only="true" aria-labelledby="contact-success-title">
      <p className="page-eyebrow">
        {result?.reference ? "Message received" : "Success-state preview"}
      </p>
      <h2 id="contact-success-title">
        {result?.reference
          ? "Your general message has been received."
          : "Confirmation details appear after a successful submission."}
      </h2>
      {result?.reference ? (
        <p>Reference: {result.reference}</p>
      ) : (
        <p>No message delivery or reference is represented in this static preview.</p>
      )}
      <div className="f3d-action-row">
        <ButtonLink href="/">Return Home</ButtonLink>
        <ButtonLink href="/products" variant="secondary">
          Browse Products
        </ButtonLink>
      </div>
    </section>
  );
}
