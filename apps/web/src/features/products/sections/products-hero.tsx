import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import type { ProductsHeroModel } from "../products.data";

export function ProductsHero({ model }: { model: ProductsHeroModel }): ReactElement {
  return (
    <section className="products-hero" data-section="products-hero" aria-labelledby="products-title">
      <Container size="wide">
        <p className="products-breadcrumb">Home / Products</p>
        <p className="public-eyebrow">{model.eyebrow}</p>
        <h1 className="products-hero__title" id="products-title">{model.title}</h1>
        <p className="products-hero__copy">{model.copy}</p>
      </Container>
    </section>
  );
}
