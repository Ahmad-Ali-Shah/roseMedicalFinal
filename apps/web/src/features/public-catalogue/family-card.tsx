import type { ReactElement } from "react";
import { MediaFrame, TiltSurface } from "@/features/motion";
import { LocaleLink, type PublicLocale } from "@/features/localization";
import { publicMediaAlt } from "@/features/public-media";
import { familyHref, type FamilyCardModel } from "./models";

export function FamilyCard({
  family,
  locale = "en"
}: {
  family: FamilyCardModel;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";

  return (
    <TiltSurface className="family-card__tilt" maxDegrees={1.6}>
      <article className="family-card premium-surface" data-family={family.slug}>
        <div className="family-card__surface">
          <LocaleLink className="family-card__link" href={familyHref(family.slug)}>
            <span className="family-card__number">{family.sequence}</span>
            <MediaFrame
              src={family.media.src}
              alt={publicMediaAlt(family.media, locale)}
              aspect="landscape"
              focalPoint={family.media.focalPoint}
              fit={family.media.fit}
              tone="light"
              mediaSlot={`family-${family.slug}`}
              className="family-card__media"
              quality={92}
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 34vw"
            />
            <div className="family-card__body">
              <h3 className="family-card__title">{family.name}</h3>
              <span className="family-card__action" aria-hidden="true">
                {ar ? "استعرض المجموعة" : "Explore collection"} <span>→</span>
              </span>
            </div>
          </LocaleLink>
        </div>
      </article>
    </TiltSurface>
  );
}
