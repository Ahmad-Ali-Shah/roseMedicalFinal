import type { ReactElement } from "react";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { AddToInquiryButton, createInquiryItemFromProduct } from "@/features/inquiry";
import { FAMILY_NAMES_AR, LocaleLink, type PublicLocale } from "@/features/localization";
import { ProductMediaPlaceholder, productHref } from "@/features/public-catalogue";

export function SearchResultPreview({
  product,
  locale = "en"
}: {
  product: CatalogueProductRecord;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const option = product.sizes[0] ?? product.variants[0] ?? product.directions[0];

  return (
    <article className="search-result-preview" data-search-result={product.id}>
      <ProductMediaPlaceholder label={product.mediaLabel} decorative aspect="square" />
      <div className="search-result-preview__identity">
        <p className="page-eyebrow">{ar ? FAMILY_NAMES_AR[product.familySlug] : product.familySlug}</p>
        <h2>{product.name}</h2>
        <p>
          {ar ? "الرمز" : "Code"} <bdi dir="ltr">{product.code}</bdi>
          {option ? ` · ${option}` : ""}
        </p>
      </div>
      <LocaleLink href={productHref(product)}>{ar ? "عرض المنتج ←" : "View product →"}</LocaleLink>
      <AddToInquiryButton
        item={createInquiryItemFromProduct(product)}
        className="button button--quiet button--standard"
      />
    </article>
  );
}
