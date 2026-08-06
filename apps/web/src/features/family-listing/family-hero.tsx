import type { ReactElement } from "react";
import type { CatalogueFamilyRecord } from "@/features/catalogue-registry";
import { MediaFrame, Reveal, TextReveal, TiltSurface } from "@/features/motion";
import type { PublicLocale } from "@/features/localization/locales";
import { LocaleLink } from "@/features/localization";
import {
  FAMILY_MEDIA_BY_SLUG,
  publicMediaAlt
} from "@/features/public-media";

export function FamilyHero({
  family,
  countLabel,
  locale = "en"
}: {
  family: CatalogueFamilyRecord;
  countLabel: string;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const media = FAMILY_MEDIA_BY_SLUG[family.slug];

  return (
    <section className="family-hero" aria-labelledby="family-title" data-family={family.slug}>
      <div className="family-hero__copy">
        <Reveal direction="none">
          <p className="public-eyebrow">{ar ? `عائلة الأدوات ${family.sequence}` : `Instrument family ${family.sequence}`}</p>
        </Reveal>
        <TextReveal as="h1" id="family-title" text={family.name} delay={0.06} />
        <Reveal direction="up" delay={0.12}>
          <p className="family-hero__introduction">{family.introduction}</p>
        </Reveal>
        <Reveal direction="up" delay={0.18} className="family-hero__actions-reveal">
          <strong className="family-hero__count">{countLabel}</strong>
          <LocaleLink className="button button--secondary button--standard" href="/catalogues">
            {ar ? `استعرض ${family.catalogueLabel}` : `Browse ${family.catalogueLabel}`}
          </LocaleLink>
        </Reveal>
      </div>
      <Reveal direction="left" delay={0.08} className="family-hero__media-reveal">
        <TiltSurface className="family-hero__media-tilt" maxDegrees={1.8}>
          <MediaFrame
            src={media.src}
            alt={publicMediaAlt(media, locale)}
            aspect="landscape"
            focalPoint={media.focalPoint}
            fit={media.fit}
            tone="light"
            className="family-hero__media"
            mediaSlot={`family-${family.slug}-hero`}
            loading="eager"
            sizes="(max-width: 900px) 100vw, 44vw"
            quality={92}
          />
        </TiltSurface>
      </Reveal>
    </section>
  );
}
