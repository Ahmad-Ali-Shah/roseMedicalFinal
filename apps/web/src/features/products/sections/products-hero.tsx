import type { ReactElement } from "react";
import { Container } from "@/components/layout";
import { Reveal, TextReveal } from "@/features/motion";
import type { ProductsHeroModel } from "../products.data";

export function ProductsHero({ model }: { model: ProductsHeroModel }): ReactElement {
  return (
    <section className="products-hero" data-section="products-hero" aria-labelledby="products-title">
      <Container size="wide">
        <Reveal direction="none" className="products-hero__breadcrumb-reveal">
          <p className="products-breadcrumb">Home / Products</p>
        </Reveal>
        <Reveal direction="up" delay={0.04}>
          <p className="public-eyebrow">{model.eyebrow}</p>
        </Reveal>
        <TextReveal
          as="h1"
          className="products-hero__title"
          id="products-title"
          text={model.title}
          mode="words"
          delay={0.08}
        />
        <Reveal direction="up" delay={0.16}>
          <p className="products-hero__copy">{model.copy}</p>
        </Reveal>
      </Container>
    </section>
  );
}
