import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Stagger, StaggerItem } from "@/features/motion";
import { ProductPreviewCard, SectionHeading, type ProductPreviewModel } from "@/features/public-catalogue";
import type { ProductsIntroModel } from "../products.data";

export function ProductPreviewGrid({
  intro,
  products
}: {
  intro: ProductsIntroModel;
  products: readonly ProductPreviewModel[];
}): ReactElement {
  return (
    <Section tone="paper" data-section="product-preview-grid" aria-labelledby="products-preview-title">
      <Container size="wide">
        <SectionHeading id="products-preview-title" level={2} eyebrow={intro.eyebrow} title={intro.title} copy={intro.copy} />
        <Stagger
          as="ul"
          className="product-preview-grid"
          aria-label="Representative products"
          interval={0.06}
        >
          {products.map((product) => (
            <StaggerItem as="li" key={product.id}>
              <ProductPreviewCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
