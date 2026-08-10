import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { TiltSurface } from "@/features/motion";
import { AddToInquiryButton, createInquiryItemFromProduct } from "@/features/inquiry";
import { LocaleLink, LocalizedText } from "@/features/localization";
import {
  ProductMediaPlaceholder,
  productHref
} from "@/features/public-catalogue";
import type { PublicLocale } from "@/features/localization/locales";

export function FamilyProductCard({
  family,
  product,
  locale = "en"
}: {
  family: CatalogueFamilyRecord;
  product: CatalogueProductRecord;
  locale?: PublicLocale;
}): ReactElement {
  const displayedProduct = locale === "ar"
    ? { ...product, name: product.nameAr?.trim() || product.name }
    : product;
  const sizeCount = product.sizes.length;

  return (
    <TiltSurface as="article" className="family-product-card premium-surface" maxDegrees={1.6}>
      <div data-product-card={product.id} className="family-product-card__surface">
        <ProductMediaPlaceholder
          label={displayedProduct.mediaLabel}
          decorative
          src={product.mediaPath}
          fallbackSrc={product.mediaFallbackPath}
          spriteIndex={product.mediaIndex}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="family-product-card__body">
          <p className="public-eyebrow">{family.name}</p>
          <h2>{displayedProduct.name}</h2>
          <p className="family-product-card__meta">
            {product.code}
            {product.primaryOption ? ` · ${product.primaryOption}` : ""}
            {` · ${sizeCount} ${sizeCount === 1 ? "size" : "sizes"}`}
          </p>
          <div className="family-product-card__actions">
            <LocaleLink className="premium-link" href={productHref(product)}>
              <LocalizedText en="View details" ar="عرض التفاصيل" /> <span aria-hidden="true">→</span>
            </LocaleLink>
            <AddToInquiryButton
              item={createInquiryItemFromProduct(product)}
              className="family-card-add"
            />
          </div>
        </div>
      </div>
    </TiltSurface>
  );
}
