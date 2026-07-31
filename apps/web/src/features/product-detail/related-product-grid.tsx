import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { ProductPreviewCard } from "@/features/public-catalogue";

export function RelatedProductGrid({
  family,
  products
}: {
  family: CatalogueFamilyRecord;
  products: readonly CatalogueProductRecord[];
}): ReactElement {
  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <p className="public-eyebrow">Related products</p>
      <h2 id="related-products-title">More from {family.name}.</h2>
      <ul className="related-product-grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreviewCard
              product={{
                id: product.id,
                slug: product.slug,
                familySlug: product.familySlug,
                familyName: family.name,
                name: product.name,
                code: product.code,
                optionSummary: product.primaryOption ? [product.primaryOption] : [],
                description: product.description,
                imageLabel: product.mediaLabel
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
