import Link from "next/link";
import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { StaticOptionField } from "./static-option-field";
import { StaticQuantityField } from "./static-quantity-field";

export function ProductProcurementSummary({
  family,
  product,
  sizeValue,
  variantValue,
  catalogueReference
}: {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  sizeValue: string;
  variantValue: string;
  catalogueReference: string;
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
        <Link href="/checkout" className="button button--primary button--standard product-add-preview" aria-describedby={controlsNoteId}>
          Add to inquiry
        </Link>
      </div>

      <p className="product-controls-note" id={controlsNoteId}>
        Product selection and inquiry controls activate in the interaction phase.
      </p>
      <Link className="product-catalogue-reference" href="/catalogues">
        Catalogue reference: {catalogueReference} <span aria-hidden="true">→</span>
      </Link>
      <p className="product-quotation-note">No public price ¹ Quotation required</p>
    </section>
  );
}
