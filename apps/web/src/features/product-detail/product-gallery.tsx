import type { ReactElement } from "react";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { TiltSurface } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";

export function ProductGallery({
  product
}: {
  product: CatalogueProductRecord;
}): ReactElement {
  return (
    <section className="product-gallery" aria-label={`${product.name} media preview`}>
      <div className="product-gallery__rail" aria-label="Media preview states">
        {[0, 1, 2, 3].map((index) => (
          <span
            className={`product-gallery__thumbnail ${index === 0 ? "is-current" : ""}`.trim()}
            aria-current={index === 0 ? "true" : undefined}
            key={index}
          >
            <ProductMediaPlaceholder
              label={`${product.name} preview ${index + 1}`}
              decorative
              aspect="portrait"
            />
          </span>
        ))}
      </div>
      <TiltSurface className="product-gallery__primary" maxDegrees={1.35}>
        <ProductMediaPlaceholder
          className="product-gallery__image"
          label={product.mediaLabel}
          decorative
          aspect="portrait"
        />
        <span className="product-gallery__zoom-note">Zoom preview activates next phase</span>
      </TiltSurface>
    </section>
  );
}
