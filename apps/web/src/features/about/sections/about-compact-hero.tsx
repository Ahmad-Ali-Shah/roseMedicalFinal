import Image from "next/image";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { LocalizedButtonLink } from "@/features/localization";
import { Reveal, TextReveal } from "@/features/motion";
import type { AboutPageModel } from "../about.data";

export function AboutCompactHero({
  model
}: {
  model: AboutPageModel["hero"];
}): ReactElement {
  return (
    <Section
      className="about-client-hero"
      data-section="about-client-hero"
      spacing="compact"
    >
      <div
        className="about-client-hero__media"
        data-media-slot={model.mediaSlot}
        data-media-state="ready"
      >
        <Image
          src="/media/editorial/about-client-hero.webp"
          alt={model.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="about-client-hero__overlay" aria-hidden="true" />
      <Container className="about-client-hero__inner" size="wide">
        <div className="about-client-hero__copy">
          <Reveal direction="up">
            <p className="about-client-eyebrow">{model.eyebrow}</p>
          </Reveal>
          <TextReveal as="h1" text={model.title} mode="words" delay={0.05} />
          <Reveal direction="up" delay={0.12}>
            <p className="about-client-hero__summary">{model.copy}</p>
          </Reveal>
          <Reveal direction="up" delay={0.18} className="about-client-hero__actions">
            <LocalizedButtonLink href={model.primary.href}>
              {model.primary.label}
            </LocalizedButtonLink>
            <LocalizedButtonLink href={model.secondary.href} variant="secondary">
              {model.secondary.label}
            </LocalizedButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
