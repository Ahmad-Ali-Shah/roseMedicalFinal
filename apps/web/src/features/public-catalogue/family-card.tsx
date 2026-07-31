import Link from "next/link";
import type { ReactElement } from "react";
import { familyHref, type FamilyCardModel } from "./models";
import { ProductMediaPlaceholder } from "./product-media-placeholder";

export function FamilyCard({ family }: { family: FamilyCardModel }): ReactElement {
  return (
    <article className="family-card">
      <Link className="family-card__link" href={familyHref(family.slug)}>
        <ProductMediaPlaceholder label={family.imageLabel} decorative aspect="landscape" />
        <div className="family-card__body">
          <p className="public-eyebrow">Instrument family</p>
          <h3 className="family-card__title">{family.name}</h3>
          {family.description ? <p className="family-card__description">{family.description}</p> : null}
          <span className="family-card__action" aria-hidden="true">View family</span>
        </div>
      </Link>
    </article>
  );
}
