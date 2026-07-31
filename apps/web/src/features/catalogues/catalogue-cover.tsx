import type { ReactElement } from "react";
import type { CatalogueDocument } from "./catalogue-document-model";

export function CatalogueCover({
  document
}: {
  document: CatalogueDocument;
}): ReactElement {
  return (
    <div
      className="catalogue-document-cover"
      role="img"
      aria-label={document.coverLabel}
    >
      <span className="catalogue-document-cover__sequence">
        {document.sequence}
      </span>
      <span className="catalogue-document-cover__title">{document.name}</span>
      <span className="catalogue-document-cover__format">PDF</span>
    </div>
  );
}
