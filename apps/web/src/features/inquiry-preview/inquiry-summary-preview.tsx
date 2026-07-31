import type { ReactElement } from "react";
import { Button } from "@/components/ui";
import type { InquiryPreviewTotals } from "./inquiry-preview-model";

export function InquirySummaryPreview({
  totals
}: {
  totals: InquiryPreviewTotals;
}): ReactElement {
  return (
    <aside className="inquiry-preview-summary" aria-labelledby="inquiry-summary-title">
      <p className="inquiry-preview-summary__eyebrow">Inquiry summary</p>
      <h2 id="inquiry-summary-title">Ready to continue?</h2>
      <dl>
        <div>
          <dt>Unique products</dt>
          <dd>{totals.uniqueProducts}</dd>
        </div>
        <div>
          <dt>Total quantity</dt>
          <dd>{totals.totalQuantity}</dd>
        </div>
      </dl>
      <p>
        No monetary prices are shown. Rosa will review the selected instruments
        before preparing a quotation.
      </p>
      <Button disabled>Proceed to request</Button>
      <small>You can edit the list after inquiry behavior is activated.</small>
    </aside>
  );
}
