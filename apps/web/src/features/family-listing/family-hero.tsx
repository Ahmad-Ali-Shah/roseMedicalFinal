import Link from "next/link";
import type { ReactElement } from "react";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import type { CatalogueFamilyRecord } from "@/features/catalogue-registry";

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
        <p className="public-eyebrow">Instrument family {family.sequence}</p>
        <h1 id="family-title">{family.name}</h1>
        <p className="family-hero__introduction">{family.introduction}</p>
        <strong className="family-hero__count">{countLabel}</strong>
        <Link className="button button--secondary button--standard" href="/catalogues">
          Browse {family.catalogueLabel}
        </Link>
      </div>
      <ProductMediaPlaceholder
        className="family-hero__media"
        label={`${family.name} family placeholder`}
        decorative
      />
    </section>
  );
}
