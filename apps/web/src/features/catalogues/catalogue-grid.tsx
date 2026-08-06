import type { ReactElement } from "react";
import { Stagger, StaggerItem } from "@/features/motion";
import { CatalogueCard } from "./catalogue-card";
import { CATALOGUE_DOCUMENTS } from "./catalogue-document-model";
import type { PublicLocale } from "@/features/localization/locales";

export function CatalogueGrid({ locale = "en" }: { locale?: PublicLocale }): ReactElement {
  return (
    <Stagger
      as="ul"
      className="catalogue-document-grid"
      aria-label={locale === "ar" ? "الكتالوجات التقنية" : "Technical catalogues"}
      interval={0.07}
    >
      {CATALOGUE_DOCUMENTS.map((document) => (
        <StaggerItem as="li" key={document.familySlug}>
          <CatalogueCard document={document} locale={locale} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
