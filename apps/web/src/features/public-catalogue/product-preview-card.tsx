import Link from "next/link";
import type { ReactElement } from "react";
import { productHref, type ProductPreviewModel } from "./models";
import { ProductMediaPlaceholder } from "./product-media-placeholder";

export function ProductPreviewCard({ product }: { product: ProductPreviewModel }): ReactElement {
  const primaryOption = product.optionSummary[0];

  return (
    <article className="product-preview-card" data-family={product.familySlug}>
      <Link className="product-preview-card__link" href={productHref(product)}>
        <ProductMediaPlaceholder label={product.imageLabel} decorative aspect="landscape" />
        <div className="product-preview-card__body">
          <p className="product-preview-card__family">{product.familyName}</p>
          <h3 className="product-preview-card__title">{product.name}</h3>
          <p className="product-preview-card__meta">
            <span className="product-code">{product.code}</span>
            {primaryOption ? <><span aria-hidden="true"> · </span><span>{primaryOption}</span></> : null}
          </p>
          <span className="product-preview-card__action" aria-hidden="true">View details <span>→</span></span>
        </div>
      </Link>
    </article>
  );
}
