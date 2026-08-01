import type { ReactElement } from "react";
import type { LegalSectionRecord } from "./legal-document-model";

export function LegalSection({
  section
}: {
  section: LegalSectionRecord;
}): ReactElement {
  return (
    <section id={section.id} data-legal-section={section.id} tabIndex={-1}>
      <span className="legal-section__sequence" aria-hidden="true">
        {section.sequence}
      </span>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
    </section>
  );
}
