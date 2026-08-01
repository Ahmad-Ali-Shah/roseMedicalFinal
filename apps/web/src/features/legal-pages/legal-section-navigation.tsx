import type { ReactElement } from "react";
import type { LegalDocumentRecord } from "./legal-document-model";

export function LegalSectionNavigation({
  document
}: {
  document: LegalDocumentRecord;
}): ReactElement {
  return (
    <nav className="legal-section-navigation" aria-label={`${document.title} contents`}>
      <p className="page-eyebrow">Contents</p>
      <ol>
        {document.sections.map((section) => (
          <li key={section.id}>
            <span aria-hidden="true">{section.sequence}</span>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
