import type { ReactElement } from "react";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import type { InquiryPreviewLine as InquiryPreviewLineModel } from "./inquiry-preview-model";

export function InquiryLinePreview({
  line
}: {
  line: InquiryPreviewLineModel;
}): ReactElement {
  const optionParts = [
    line.size ? `Size: ${line.size}` : null,
    line.variant ? `Variant: ${line.variant}` : null
  ].filter(Boolean);

  return (
    <article className="inquiry-preview-line" data-inquiry-line={line.product.id}>
      <ProductMediaPlaceholder
        label={line.product.mediaLabel}
        decorative
        aspect="square"
        className="inquiry-preview-line__media"
      />
      <div className="inquiry-preview-line__identity">
        <p className="inquiry-preview-line__family">
          {line.product.familySlug}
        </p>
        <h2>{line.product.name}</h2>
        <p className="inquiry-preview-line__code">Code {line.product.code}</p>
        {optionParts.length ? (
          <p className="inquiry-preview-line__options">
            {optionParts.join(" · ")}
          </p>
        ) : null}
      </div>
      <div className="inquiry-preview-line__controls">
        <div className="inquiry-preview-quantity" aria-label="Quantity preview">
          <span className="inquiry-preview-control-label">Quantity</span>
          <div>
            <button type="button" disabled aria-label="Decrease quantity">
              −
            </button>
            <output aria-label="Selected quantity">{line.quantity}</output>
            <button type="button" disabled aria-label="Increase quantity">
              +
            </button>
          </div>
        </div>
        <label className="inquiry-preview-note">
          <span className="inquiry-preview-control-label">Line note</span>
          <input
            type="text"
            value={line.note ?? ""}
            placeholder="Optional requirement"
            readOnly
          />
        </label>
        <button type="button" className="disabled-text-action" disabled>
          Remove
        </button>
      </div>
    </article>
  );
}
