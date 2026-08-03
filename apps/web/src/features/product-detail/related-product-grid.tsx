import type { ReactElement } from "react";
import type {
  CatalogueFamilyRecord,
  CatalogueProductRecord
} from "@/features/catalogue-registry";
import { Stagger, StaggerItem } from "@/features/motion";
import { ProductPreviewCard, type ProductPreviewModel } from "@/features/public-catalogue";

function toProductPreview(
  family: CatalogueFamilyRecord,
  product: CatalogueProductRecord
): ProductPreviewModel {
  return {
    id: product.id,
    slug: product.slug,
    familySlug: product.familySlug,
    familyName: family.name,
    name: product.name,
    code: product.code,
    optionSummary: product.primaryOption ? [product.primaryOption] : [],
    ...(product.description ? { description: product.description } : {}),
    imageLabel: product.mediaLabel
  };
}

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
      <Stagger as="ul" className="related-product-grid" interval={0.06}>
        {products.map((product) => (
          <StaggerItem as="li" key={product.id}>
            <ProductPreviewCard product={toProductPreview(family, product)} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
