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
        <span className="product-gallery__thumbnail is-current" aria-current="true" data-gallery-state="current">
          <ProductMediaPlaceholder label={`${product.name} preview`} decorative aspect="portrait" src={product.mediaPath} fallbackSrc={product.mediaFallbackPath} spriteIndex={product.mediaIndex} sizes="5rem" />
        </span>
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
          {product.mediaPath ? "Catalogue image" : "Product image unavailable"}
        </span>
      </TiltSurface>
    </section>
  );
}
