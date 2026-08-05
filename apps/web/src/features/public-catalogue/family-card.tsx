import Link from "next/link";
import type { ReactElement } from "react";
import { TiltSurface } from "@/features/motion";
import { FAMILY_SLUGS, familyHref, type FamilyCardModel } from "./models";
import { ProductMediaPlaceholder } from "./product-media-placeholder";

export function FamilyCard({ family }: { family: FamilyCardModel }): ReactElement {
  const ordinal = String(FAMILY_SLUGS.indexOf(family.slug) + 1).padStart(2, "0");

  return (
    <TiltSurface className="family-card__tilt" maxDegrees={1.6}>
      <article className="family-card premium-surface" data-family={family.slug}>
        <div className="family-card__surface">
          <Link className="family-card__link" href={familyHref(family.slug)}>
            <span className="family-card__number">{ordinal}</span>
            <ProductMediaPlaceholder label={family.imageLabel} decorative aspect="landscape" />
            <div className="family-card__body">
              <h3 className="family-card__title">{family.name}</h3>
              <span className="family-card__action" aria-hidden="true">
                Explore collection <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      </article>
    </TiltSurface>
  );
}
