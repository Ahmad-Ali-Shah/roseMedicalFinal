import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui";
import { CatalogueCover } from "./catalogue-cover";
import type { CatalogueDocument } from "./catalogue-document-model";

export function CatalogueCard({
  document,
  featured = false
}: {
  document: CatalogueDocument;
  featured?: boolean;
}): ReactElement {
  const explanationId = `catalogue-${document.familySlug}-pdf-status`;

  return (
    <article
      className={`catalogue-document-card${
        featured ? " catalogue-document-card--featured" : ""
      }`}
      data-catalogue-document={document.familySlug}
    >
      <CatalogueCover document={document} />
      <div className="catalogue-document-card__content">
        <p className="catalogue-document-card__eyebrow">
          Instrument family {document.sequence}
        </p>
        <h2>{document.name}</h2>
        <p className="catalogue-document-card__description">
          {document.description}
        </p>
        <p className="catalogue-document-card__status">
          {document.sourceStatus}
        </p>
        <div className="catalogue-document-card__actions">
          {document.pdfPath ? (
            <a
              className="button button--primary button--small"
              href={document.pdfPath}
            >
              View PDF
            </a>
          ) : (
            <button
              type="button"
              className="button button--secondary button--small"
              disabled
              aria-describedby={explanationId}
            >
              PDF not available online
            </button>
          )}
          <ButtonLink
            href={document.familyHref}
            variant="secondary"
            size="small"
          >
            Explore products
          </ButtonLink>
        </div>
        {!document.pdfPath ? (
          <p
            className="catalogue-document-card__pdf-note"
            id={explanationId}
          >
            The technical source document is not yet exposed as a public
            download.
          </p>
        ) : null}
      </div>
    </article>
  );
}
