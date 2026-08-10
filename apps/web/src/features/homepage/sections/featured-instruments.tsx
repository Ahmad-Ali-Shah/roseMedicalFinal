import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Stagger, StaggerItem } from "@/features/motion";
import {
  ProductPreviewCard,
  SectionHeading,
  type ProductPreviewModel
} from "@/features/public-catalogue";
import type { HomeProductsIntroModel } from "../homepage.data";

export function FeaturedInstruments({
  intro,
  products
}: {
  intro: HomeProductsIntroModel;
  products: readonly ProductPreviewModel[];
}): ReactElement {
  return (
    <Section
      tone="paper"
      data-section="featured-instruments"
      aria-labelledby="featured-instruments-title"
    >
      <Container size="wide">
        <SectionHeading
          id="featured-instruments-title"
          level={2}
          eyebrow={intro.eyebrow}
          title={intro.title}
          copy={intro.copy}
        />
        <Stagger
          as="ul"
          className="product-preview-grid product-preview-grid--featured"
          aria-label="Representative products"
          interval={0.08}
        >
          {products.map((product, index) => (
            <StaggerItem as="li" key={product.id}>
              <ProductPreviewCard product={product} featured={index === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
