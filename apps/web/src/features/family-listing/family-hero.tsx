import Link from "next/link";
import type { ReactElement } from "react";
import type { CatalogueFamilyRecord } from "@/features/catalogue-registry";
import { Reveal, TextReveal, TiltSurface } from "@/features/motion";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";

export function FamilyHero({
  family,
  countLabel
}: {
  family: CatalogueFamilyRecord;
  countLabel: string;
}): ReactElement {
  return (
    <section className="family-hero" aria-labelledby="family-title">
      <div className="family-hero__copy">
        <Reveal direction="none">
          <p className="public-eyebrow">Instrument family {family.sequence}</p>
        </Reveal>
        <TextReveal as="h1" id="family-title" text={family.name} delay={0.06} />
        <Reveal direction="up" delay={0.12}>
          <p className="family-hero__introduction">{family.introduction}</p>
        </Reveal>
        <Reveal direction="up" delay={0.18} className="family-hero__actions-reveal">
          <strong className="family-hero__count">{countLabel}</strong>
          <Link className="button button--secondary button--standard" href="/catalogues">
            Browse {family.catalogueLabel}
          </Link>
        </Reveal>
      </div>
      <Reveal direction="left" delay={0.08} className="family-hero__media-reveal">
        <TiltSurface className="family-hero__media-tilt" maxDegrees={1.8}>
          <ProductMediaPlaceholder
            className="family-hero__media"
            label={`${family.name} family placeholder`}
            decorative
          />
        </TiltSurface>
      </Reveal>
    </section>
  );
}
