import Link from "next/link";
import type { ReactElement } from "react";
import { productHref, type ProductPreviewModel } from "./models";
import { ProductMediaPlaceholder } from "./product-media-placeholder";

export function ProductPreviewCard({ product }: { product: ProductPreviewModel }): ReactElement {
  return (
    <article className="product-preview-card">
      <Link className="product-preview-card__link" href={productHref(product)}>
        <ProductMediaPlaceholder label={product.imageLabel} decorative aspect="portrait" />
        <div className="product-preview-card__body">
          <div className="product-preview-card__meta">
            <span>{product.familyName}</span>
            <span className="product-code">{product.code}</span>
          </div>
          <h3 className="product-preview-card__title">{product.name}</h3>
          {product.description ? <p className="product-preview-card__description">{product.description}</p> : null}
          <span className="product-preview-card__action" aria-hidden="true">Review product</span>
        </div>
      </Link>
    </article>
  );
}
