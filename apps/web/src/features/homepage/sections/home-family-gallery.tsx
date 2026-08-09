"use client";

import { useState, type ReactElement } from "react";
import { MediaFrame } from "@/features/motion";
import { LocaleLink, type PublicLocale } from "@/features/localization";
import { publicMediaAlt } from "@/features/public-media";
import {
  FAMILY_SLUGS,
  familyHref,
  type FamilyCardModel
} from "@/features/public-catalogue";

function inApprovedFamilyOrder(
  families: readonly FamilyCardModel[]
): readonly FamilyCardModel[] {
  return FAMILY_SLUGS.flatMap((slug) => {
    const family = families.find((candidate) => candidate.slug === slug);
    return family ? [family] : [];
  });
}

export function HomeFamilyGallery({
  families,
  locale = "en"
}: {
  families: readonly FamilyCardModel[];
  locale?: PublicLocale;
}): ReactElement {
  const orderedFamilies = inApprovedFamilyOrder(families);
  const [activeFamily, setActiveFamily] = useState(
    () => orderedFamilies[0]?.slug ?? "knives"
  );

  return (
    <div className="home-family-gallery-shell">
      <ul
        className="home-family-gallery"
        data-home-family-gallery
        aria-label={locale === "ar" ? "منتجات روزا" : "ROSA products"}
      >
        {orderedFamilies.map((family) => (
          <li
            key={family.slug}
            className="home-family-gallery__panel"
            data-family-panel
            data-family={family.slug}
            data-active={family.slug === activeFamily ? "true" : "false"}
            onMouseEnter={() => setActiveFamily(family.slug)}
            onFocusCapture={() => setActiveFamily(family.slug)}
          >
            <LocaleLink
              className="home-family-gallery__link"
              href={familyHref(family.slug)}
            >
              <MediaFrame
                src={family.media.src}
                alt={publicMediaAlt(family.media, locale)}
                aspect="landscape"
                focalPoint={family.media.focalPoint}
                fit={family.media.fit}
                tone="dark"
                overlay="none"
                mediaSlot={`homepage-family-${family.slug}`}
                className="home-family-gallery__media"
                quality={92}
                sizes="(max-width: 56rem) 84vw, 28vw"
              />
              <span className="home-family-gallery__shade" aria-hidden="true" />
              <h3 className="home-family-gallery__title">{family.name}</h3>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
