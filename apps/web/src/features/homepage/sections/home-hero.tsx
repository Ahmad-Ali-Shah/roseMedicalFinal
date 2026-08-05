import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";
import {
  Magnetic,
  MediaFrame,
  ProgressiveBlur,
  Reveal,
  SpotlightSurface,
  TextReveal,
  TiltSurface
} from "@/features/motion";
import type { HomeHeroModel } from "../homepage.data";

export function HomeHero({ model }: { model: HomeHeroModel }): ReactElement {
  return (
    <Section
      className="home-hero public-hero"
      tone="dark"
      spacing="compact"
      data-section="home-hero"
      data-home-choreography="hero"
      aria-labelledby="home-title"
    >
      <Container className="home-hero__grid" size="wide">
        <div className="home-hero__copy">
          <Reveal direction="up" delay={0.04}>
            <p className="public-eyebrow">{model.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h1"
            className="home-hero__title"
            id="home-title"
            text={model.title}
            delay={0.12}
          />
          <Reveal direction="up" delay={0.24}>
            <p className="home-hero__copy-text">{model.copy}</p>
          </Reveal>
          <Reveal direction="up" delay={0.32}>
            <div className="home-hero__actions">
              <Magnetic>
                <ButtonLink href={model.primary.href}>{model.primary.label}</ButtonLink>
              </Magnetic>
              <ButtonLink href={model.secondary.href} variant="secondary">
                {model.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.42}>
            <span className="home-hero__scroll">Scroll to explore</span>
          </Reveal>
        </div>
        <Reveal className="home-hero__visual" direction="left" delay={0.18}>
          <SpotlightSurface className="home-hero__visual-surface">
            <TiltSurface className="home-hero__visual-tilt" maxDegrees={1.6}>
              <MediaFrame
                alt="Cinematic surgical instrument composition reserved for final imagery"
                aspect="cinematic"
                tone="dark"
                overlay="soft"
                mediaSlot="homepage-hero"
                className="home-hero__media"
              >
                <div className="home-hero__instrument-composition" aria-hidden="true">
                  <span className="home-hero__instrument home-hero__instrument--primary" />
                  <span className="home-hero__instrument home-hero__instrument--secondary" />
                  <span className="home-hero__instrument home-hero__instrument--detail" />
                  <span className="home-hero__instrument-orbit" />
                </div>
              </MediaFrame>
            </TiltSurface>
            <ProgressiveBlur edge="bottom" className="home-hero__blur" />
          </SpotlightSurface>
        </Reveal>
      </Container>
    </Section>
  );
}
