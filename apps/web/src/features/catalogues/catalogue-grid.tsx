import type { ReactElement } from "react";
import { Stagger, StaggerItem } from "@/features/motion";
import { CatalogueCard } from "./catalogue-card";
import { CATALOGUE_DOCUMENTS } from "./catalogue-document-model";

export function CatalogueGrid(): ReactElement {
  return (
    <Stagger as="ul" className="catalogue-document-grid" aria-label="Technical catalogues" interval={0.07}>
      {CATALOGUE_DOCUMENTS.map((document, index) => (
        <StaggerItem as="li" key={document.familySlug}>
          <CatalogueCard document={document} featured={index === 0} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
