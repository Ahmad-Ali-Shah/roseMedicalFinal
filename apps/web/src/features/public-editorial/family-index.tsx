import Link from "next/link";
import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";

export function FamilyIndex(): ReactElement {
  return (
    <ol className="public-family-index" aria-label="Instrument families">
      {CATALOGUE_FAMILIES.map((family) => (
        <li key={family.slug} data-family-index-row={family.slug}>
          <span className="public-family-index__sequence" aria-hidden="true">
            {family.sequence}
          </span>
          <strong>{family.name}</strong>
          <Link href={familyHref(family.slug)}>Explore family →</Link>
        </li>
      ))}
    </ol>
  );
}
