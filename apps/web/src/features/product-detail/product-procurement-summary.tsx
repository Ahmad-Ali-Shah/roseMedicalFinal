import Link from "next/link";
import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { AddToInquiryButton, type InquiryItem } from "@/features/inquiry";
import { StaticOptionField } from "./static-option-field";
import { StaticQuantityField } from "./static-quantity-field";

export function ProductProcurementSummary({
  family,
  product,
  sizeValue,
  variantValue,
  catalogueReference,
  inquiryItem
}: {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  sizeValue: string;
  variantValue: string;
  catalogueReference: string;
  inquiryItem: InquiryItem;
}): ReactElement {
  const controlsNoteId = `product-controls-${product.id}`;

  return (
    <section className="product-procurement-summary" aria-labelledby="product-title">
      <p className="public-eyebrow">{family.name}</p>
      <h1 id="product-title">{product.name}</h1>
      <strong className="product-procurement-summary__code">Product code {product.code}</strong>
      {product.description ? <p className="product-procurement-summary__description">{product.description}</p> : null}

      <div className="product-procurement-summary__options">
        <StaticOptionField label="Size" value={sizeValue} />
        <StaticOptionField label="Variant" value={variantValue} />
        <StaticQuantityField value={1} />
        <AddToInquiryButton item={inquiryItem} />
      </div>

      <p className="product-controls-note" id={controlsNoteId}>
        Add this instrument to your quotation inquiry, then review quantities and notes.
      </p>
      <Link className="product-catalogue-reference" href="/catalogues">
        Catalogue reference: {catalogueReference} <span aria-hidden="true">→</span>
      </Link>
      <p className="product-quotation-note">No public price ¹ Quotation required</p>
    </section>
  );
}
