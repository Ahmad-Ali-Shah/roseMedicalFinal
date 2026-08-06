import type { ReactElement } from "react";
import { MediaFrame } from "@/features/motion";
import { FAMILY_NAMES_AR } from "@/features/localization/public-copy";
import type { PublicLocale } from "@/features/localization/locales";
import { publicMediaAlt } from "@/features/public-media";
import type { CatalogueDocument } from "./catalogue-document-model";

export function CatalogueCover({
  document,
  locale = "en"
}: {
  document: CatalogueDocument;
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";
  const familyName = ar ? FAMILY_NAMES_AR[document.familySlug] : document.name;

  return (
    <div
      className="catalogue-document-cover catalogue-document-cover--glare"
      data-catalogue-family-media={document.familySlug}
    >
      <MediaFrame
        src={document.media.src}
        alt={ar
          ? `معاينة كتالوج ${familyName}: ${publicMediaAlt(document.media, locale)}`
          : `${document.coverLabel}: ${publicMediaAlt(document.media, locale)}`}
        aspect="portrait"
        focalPoint={document.media.focalPoint}
        fit={document.media.fit}
        tone="light"
        mediaSlot={`catalogue-document-${document.familySlug}`}
        className="catalogue-document-cover__media"
        quality={92}
        sizes="(max-width: 640px) 9.5rem, 12rem"
      />
      <span className="catalogue-document-cover__wash" aria-hidden="true" />
      <span className="catalogue-document-cover__sequence">
        {document.sequence}
      </span>
      <span className="catalogue-document-cover__title">{familyName}</span>
      {document.pdfPath ? (
        <span className="catalogue-document-cover__format">PDF</span>
      ) : null}
    </div>
  );
}
