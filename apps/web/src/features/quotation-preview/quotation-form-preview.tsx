import type { ReactElement } from "react";
import { Button } from "@/components/ui";
import { QuotationFailurePreview } from "./quotation-failure-preview";
import { QuotationFieldPreview } from "./quotation-field-preview";
import { QuotationProductSummary } from "./quotation-product-summary";
import { QuotationValidationPreview } from "./quotation-validation-preview";

export function QuotationFormPreview(): ReactElement {
  return (
    <div className="quotation-form-preview" data-preview-only="true">
      <form className="quotation-form-preview__form" aria-label="Quotation request preview">
        <fieldset>
          <legend>Contact information</legend>
          <div className="quotation-form-preview__field-grid">
            <QuotationFieldPreview
              id="quotation-preview-customer-name"
              label="Customer name"
              placeholder="Your full name"
            />
            <QuotationFieldPreview
              id="quotation-preview-company"
              label="Company name"
              placeholder="Company or organisation"
            />
            <QuotationFieldPreview
              id="quotation-preview-email"
              label="Email"
              placeholder="name@company.com"
            />
            <QuotationFieldPreview
              id="quotation-preview-telephone"
              label="Telephone"
              placeholder="Country code and number"
            />
            <QuotationFieldPreview
              id="quotation-preview-country"
              label="Country"
              placeholder="Select country"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>General request notes</legend>
          <QuotationFieldPreview
            id="quotation-preview-notes"
            label="Procurement context"
            placeholder="Required finish, packing, destination or unlisted product codes"
            multiline
          />
        </fieldset>
        <fieldset>
          <legend>Submission</legend>
          <label className="quotation-preview-confirmation">
            <input type="checkbox" disabled />
            <span>
              I confirm that the selected product details and contact
              information are correct.
            </span>
          </label>
          <div className="quotation-form-preview__submit-row">
            <Button disabled>Submit quotation request</Button>
            <small>
              Confirmation behavior is activated only after a successful later
              submission phase.
            </small>
          </div>
        </fieldset>
        <QuotationValidationPreview />
        <QuotationFailurePreview />
      </form>
      <QuotationProductSummary />
    </div>
  );
}
