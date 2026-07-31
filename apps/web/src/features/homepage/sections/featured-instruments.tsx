import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { ProductPreviewCard, SectionHeading, type ProductPreviewModel } from "@/features/public-catalogue";
import type { HomeProductsIntroModel } from "../homepage.data";

export function FeaturedInstruments({
  intro,
  products
}: {
  intro: HomeProductsIntroModel;
  products: readonly ProductPreviewModel[];
}): ReactElement {
  return (
    <Section tone="paper" data-section="featured-instruments" aria-labelledby="featured-instruments-title">
      <Container size="wide">
        <SectionHeading
          id="featured-instruments-title"
          level={2}
          eyebrow={intro.eyebrow}
          title={intro.title}
          copy={intro.copy}
        />
        <ul className="product-preview-grid" aria-label="Representative products">
          {products.map((product) => <li key={product.id}><ProductPreviewCard product={product} /></li>)}
        </ul>
      </Container>
    </Section>
  );
}
