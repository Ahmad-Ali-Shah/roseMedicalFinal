import Link from "next/link";
import type { ReactElement } from "react";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import {
  INQUIRY_PREVIEW_LINES,
  getInquiryPreviewTotals
} from "@/features/inquiry-preview";

export function QuotationProductSummary(): ReactElement {
  const totals = getInquiryPreviewTotals();

  return (
    <aside className="quotation-product-summary" aria-labelledby="quotation-products-title">
      <p className="quotation-product-summary__eyebrow">Selected products</p>
      <h2 id="quotation-products-title">{totals.uniqueProducts} products</h2>
      <ul>
        {INQUIRY_PREVIEW_LINES.map((line) => (
          <li key={line.id}>
            <ProductMediaPlaceholder
              label={line.product.mediaLabel}
              decorative
              aspect="square"
              className="quotation-product-summary__media"
            />
            <div>
              <strong>{line.product.name}</strong>
              <span>Code {line.product.code}</span>
              <span>Quantity {line.quantity}</span>
            </div>
            <Link href="/inquiry">Edit</Link>
          </li>
        ))}
      </ul>
      <div className="quotation-product-summary__total">
        <span>Total quantity</span>
        <output>{totals.totalQuantity}</output>
      </div>
      <Link className="text-link" href="/inquiry">
        Return to inquiry →
      </Link>
    </aside>
  );
}
