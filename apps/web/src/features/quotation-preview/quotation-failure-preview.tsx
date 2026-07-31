import type { ReactElement } from "react";
import { Button } from "@/components/ui";

export function QuotationFailurePreview(): ReactElement {
  return (
    <aside className="quotation-failure-preview" aria-labelledby="quotation-failure-title">
      <div>
        <p className="quotation-failure-preview__eyebrow" id="quotation-failure-title">
          Submission could not be completed
        </p>
        <p>
          Preview only: entered information would remain available while the
          connection is checked.
        </p>
      </div>
      <Button variant="quiet" disabled>
        Try again
      </Button>
    </aside>
  );
}
