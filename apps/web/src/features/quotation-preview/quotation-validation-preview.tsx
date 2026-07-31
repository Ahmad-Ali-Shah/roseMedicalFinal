import type { ReactElement } from "react";
import { QuotationFieldPreview } from "./quotation-field-preview";

export function QuotationValidationPreview(): ReactElement {
  return (
    <section className="quotation-validation-preview" aria-labelledby="quotation-validation-title">
      <p className="quotation-validation-preview__eyebrow" id="quotation-validation-title">
        Validation examples
      </p>
      <div className="quotation-validation-preview__grid">
        <QuotationFieldPreview
          id="quotation-preview-invalid-email"
          label="Email"
          placeholder="name@company.com"
          value="name@company"
          error="Enter a valid email address"
        />
        <QuotationFieldPreview
          id="quotation-preview-invalid-phone"
          label="Telephone"
          placeholder="Country code and number"
          value="Phone number required"
          error="Enter a valid telephone number"
        />
      </div>
    </section>
  );
}
