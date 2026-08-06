import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { Stagger, StaggerItem } from "@/features/motion";
import { familyHref } from "@/features/public-catalogue";
import type { PublicLocale } from "@/features/localization/locales";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import { LocaleLink } from "@/features/localization/locale-link";

export function SearchFamilyShortcuts({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  return (
    <Stagger as="ol" className="search-family-shortcuts" aria-label={locale === "ar" ? "ابدأ بإحدى العائلات" : "Start with a family"} interval={0.045}>
      {CATALOGUE_FAMILIES.map((family) => (
        <StaggerItem as="li" key={family.slug} data-search-family-shortcut={family.slug}>
          <LocaleLink href={familyHref(family.slug)}>
            <span className="search-family-shortcuts__sequence" aria-hidden="true">{family.sequence}</span>
            <strong>{locale === "ar" ? FAMILY_NAMES_AR[family.slug] : family.name}</strong>
            <span className="search-family-shortcuts__arrow" aria-hidden="true">→</span>
          </LocaleLink>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
