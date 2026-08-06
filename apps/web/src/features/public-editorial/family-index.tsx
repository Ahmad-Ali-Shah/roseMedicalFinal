import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";
import { FAMILY_NAMES_AR, LocaleLink, type PublicLocale } from "@/features/localization";

export function FamilyIndex({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  const ar = locale === "ar";
  return (
    <ol className="public-family-index" aria-label={ar ? "عائلات الأدوات" : "Instrument families"}>
      {CATALOGUE_FAMILIES.map((family) => (
        <li key={family.slug} data-family-index-row={family.slug}>
          <span className="public-family-index__sequence" aria-hidden="true">
            {family.sequence}
          </span>
          <strong>{ar ? FAMILY_NAMES_AR[family.slug] : family.name}</strong>
          <LocaleLink href={familyHref(family.slug)}>{ar ? "استعرض العائلة ←" : "Explore family →"}</LocaleLink>
        </li>
      ))}
    </ol>
  );
}
