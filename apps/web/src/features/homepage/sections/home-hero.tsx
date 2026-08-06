import type { ReactElement } from "react";
import { LocalizedButtonLink } from "@/features/localization";
import { Container, Section } from "@/components/layout";
import {
  Magnetic,
  MediaFrame,
  Reveal,
  TextReveal
} from "@/features/motion";
import type { HomeHeroModel } from "../homepage.data";
import { HOME_HERO_MEDIA } from "@/features/public-media";
import { publicMediaAlt } from "@/features/public-media";
import type { PublicLocale } from "@/features/localization";

export function HomeHero({
  model,
  locale = "en"
}: {
  model: HomeHeroModel;
  locale?: PublicLocale;
}): ReactElement {
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
                <LocalizedButtonLink href={model.primary.href}>{model.primary.label}</LocalizedButtonLink>
              </Magnetic>
              <LocalizedButtonLink href={model.secondary.href} variant="secondary">
                {model.secondary.label}
              </LocalizedButtonLink>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.42}>
            <span className="home-hero__scroll">
              {locale === "ar" ? "مرر للاستكشاف" : "Scroll to explore"}
            </span>
          </Reveal>
        </div>
      </Container>
      <Reveal className="home-hero__visual home-hero__visual--fullbleed" direction="left" delay={0.18}>
        <MediaFrame
          src={HOME_HERO_MEDIA.src}
          alt={publicMediaAlt(HOME_HERO_MEDIA, locale)}
          aspect="cinematic"
          focalPoint={HOME_HERO_MEDIA.focalPoint}
          fit={HOME_HERO_MEDIA.fit}
          tone="dark"
          mediaSlot="homepage-hero"
          className="home-hero__media"
          loading="eager"
          quality={92}
          sizes="(max-width: 640px) 100vw, 68vw"
        />
        <span className="home-hero__media-fade" aria-hidden="true" />
      </Reveal>
    </Section>
  );
}
