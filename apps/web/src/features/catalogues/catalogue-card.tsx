import type { ReactElement } from "react";
import { TiltSurface } from "@/features/motion";
import { CatalogueCover } from "./catalogue-cover";
import type { CatalogueDocument } from "./catalogue-document-model";
import type { PublicLocale } from "@/features/localization/locales";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import { LocalizedButtonLink } from "@/features/localization";

export function CatalogueCard({
  document,
  locale = "en"
}: {
  document: CatalogueDocument;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";

  return (
    <TiltSurface className="catalogue-document-card__tilt" maxDegrees={1.4}>
      <article
        className="catalogue-document-card premium-surface"
        data-catalogue-document={document.familySlug}
      >
        <CatalogueCover document={document} locale={locale} />
        <div className="catalogue-document-card__content">
          <p className="catalogue-document-card__eyebrow">
            {ar ? `عائلة الأدوات ${document.sequence}` : `Instrument family ${document.sequence}`}
          </p>
          <h2>{ar ? FAMILY_NAMES_AR[document.familySlug] : document.name}</h2>
          <p className="catalogue-document-card__description">
            {ar ? `كتالوج تقني منظم لعائلة ${FAMILY_NAMES_AR[document.familySlug]} حسب الرموز والخيارات المدرجة.` : document.description}
          </p>
          <p className="catalogue-document-card__status">
            {ar ? "كتالوج تقني لعائلة الأدوات" : document.sourceStatus}
          </p>
          <div className="catalogue-document-card__actions">
            <a
              className="button button--primary button--small"
              href={document.pdfPath}
              download={`rosa-${document.familySlug}-catalogue.pdf`}
              aria-label={ar
                ? `تنزيل كتالوج ${FAMILY_NAMES_AR[document.familySlug]} بصيغة PDF`
                : `Download ${document.name} catalogue PDF`}
            >
              {ar ? "تنزيل PDF" : "Download PDF"}
            </a>
            <LocalizedButtonLink
              href={document.familyHref}
              variant="secondary"
              size="small"
            >
              {ar ? "استعرض المنتجات" : "Explore products"}
            </LocalizedButtonLink>
          </div>
        </div>
      </article>
    </TiltSurface>
  );
}
