import Link from "next/link";
import type { ReactElement } from "react";
import { Button } from "@/components/ui";
import type { CatalogueProductRecord } from "@/features/catalogue-registry";
import { ProductMediaPlaceholder, productHref } from "@/features/public-catalogue";

export function SearchResultPreview({
  product
}: {
  product: CatalogueProductRecord;
}): ReactElement {
  const option = product.sizes[0] ?? product.variants[0] ?? product.directions[0];

  return (
    <article className="search-result-preview" data-search-result={product.id}>
      <ProductMediaPlaceholder label={product.mediaLabel} decorative aspect="square" />
      <div className="search-result-preview__identity">
        <p className="page-eyebrow">{product.familySlug}</p>
        <h2>{product.name}</h2>
        <p>
          Code {product.code}
          {option ? ` · ${option}` : ""}
        </p>
      </div>
      <Link href={productHref(product)}>View product →</Link>
      <Button variant="quiet" disabled>
        Add to inquiry
      </Button>
    </article>
  );
}
