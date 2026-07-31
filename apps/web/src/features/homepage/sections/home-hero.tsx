import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";
import type { HomeHeroModel } from "../homepage.data";

export function HomeHero({ model }: { model: HomeHeroModel }): ReactElement {
  return (
    <Section className="home-hero public-hero" tone="dark" spacing="compact" data-section="home-hero" aria-labelledby="home-title">
      <Container className="home-hero__grid" size="wide">
        <div className="home-hero__copy">
          <p className="public-eyebrow">{model.eyebrow}</p>
          <h1 className="home-hero__title" id="home-title">{model.title}</h1>
          <p className="home-hero__copy-text">{model.copy}</p>
          <div className="home-hero__actions">
            <ButtonLink href={model.primary.href}>{model.primary.label}</ButtonLink>
            <ButtonLink href={model.secondary.href} variant="secondary">{model.secondary.label}</ButtonLink>
          </div>
          <span className="home-hero__scroll">Scroll to explore</span>
        </div>
        <div className="home-hero__visual" aria-hidden="true" />
      </Container>
    </Section>
  );
}
