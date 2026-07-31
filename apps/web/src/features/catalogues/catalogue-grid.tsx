import type { ReactElement } from "react";
import { CatalogueCard } from "./catalogue-card";
import { CATALOGUE_DOCUMENTS } from "./catalogue-document-model";

export function CatalogueGrid(): ReactElement {
  return (
    <ul className="catalogue-document-grid" aria-label="Technical catalogues">
      {CATALOGUE_DOCUMENTS.map((document, index) => (
        <li key={document.familySlug}>
          <CatalogueCard document={document} featured={index === 0} />
        </li>
      ))}
    </ul>
  );
}
