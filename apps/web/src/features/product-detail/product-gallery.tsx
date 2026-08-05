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
            data-gallery-state={index === 0 ? "current" : "preview"}
            key={index}
          >
            <ProductMediaPlaceholder
              label={`${product.name} preview ${index + 1}`}
              decorative
              aspect="portrait"
              src={index === 0 ? product.mediaPath : undefined}
              fallbackSrc={index === 0 ? product.mediaFallbackPath : undefined}
              spriteIndex={index === 0 ? product.mediaIndex : undefined}
              sizes="5rem"
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
          src={product.mediaPath}
          fallbackSrc={product.mediaFallbackPath}
          spriteIndex={product.mediaIndex}
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <span className="product-gallery__zoom-note">
          {product.mediaPath ? "Catalogue image · approved review asset" : "Zoom preview activates next phase"}
        </span>
      </TiltSurface>
    </section>
  );
}
