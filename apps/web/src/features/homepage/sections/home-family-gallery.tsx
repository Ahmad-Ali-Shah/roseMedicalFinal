"use client";

import type { ReactElement } from "react";
import { MediaFrame } from "@/features/motion";
import { LocaleLink, type PublicLocale } from "@/features/localization";
import { publicMediaAlt } from "@/features/public-media";
import {
  FAMILY_SLUGS,
  familyHref,
  type FamilyCardModel,
  type FamilySlug
} from "@/features/public-catalogue";

const HOME_FAMILY_COVER_BY_SLUG = {
  knives: {
    src: "/media/families/homepage-covers/knives-family-cover-full.svg",
    focalPoint: "50% 50%"
  },
  scissors: {
    src: "/media/families/homepage-covers/scissors-family-cover-full.svg",
    focalPoint: "50% 50%"
  },
  punches: {
    src: "/media/families/homepage-covers/punches-family-cover-full.svg",
    focalPoint: "50% 50%"
  },
  chisels: {
    src: "/media/families/homepage-covers/chisels-family-cover-full.svg",
    focalPoint: "50% 50%"
  },
  cutters: {
    src: "/media/families/homepage-covers/cutters-family-cover-full.svg",
    focalPoint: "50% 50%"
  }
} as const satisfies Record<
  FamilySlug,
  { src: string; focalPoint: string }
>;

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

  return (
    <div className="home-family-gallery-shell">
      <ul
        className="home-family-gallery"
        data-home-family-gallery
        aria-label={locale === "ar" ? "منتجات روزا" : "ROSA products"}
      >
        {orderedFamilies.map((family) => {
          const cover = HOME_FAMILY_COVER_BY_SLUG[family.slug];

          return (
            <li
              key={family.slug}
              className="home-family-gallery__panel"
              data-family-panel
              data-family={family.slug}
            >
              <LocaleLink
                className="home-family-gallery__link"
                href={familyHref(family.slug)}
                aria-label={family.name}
              >
                <MediaFrame
                  src={cover.src}
                  alt={publicMediaAlt(family.media, locale)}
                  aspect="portrait"
                  focalPoint={cover.focalPoint}
                  fit="cover"
                  tone="light"
                  overlay="none"
                  mediaSlot={`homepage-family-${family.slug}`}
                  className="home-family-gallery__media home-family-gallery__media--catalogue-cover"
                  quality={92}
                  sizes="(max-width: 40rem) 46vw, (max-width: 64rem) 30vw, 18vw"
                />
                <h3 className="home-family-gallery__title home-family-gallery__title--cover">
                  {family.name}
                </h3>
              </LocaleLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
