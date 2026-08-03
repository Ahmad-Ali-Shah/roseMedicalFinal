import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import type { LegalDocumentRecord } from "./legal-document-model";
import { LegalSectionNavigation } from "./legal-section-navigation";
import { LegalSection } from "./legal-section";

export function LegalPage({
  document
}: {
  document: LegalDocumentRecord;
}): ReactElement {
  return (
    <>
      <Section tone="paper" spacing="compact" className="legal-page__hero">
        <Container size="wide">
          <Reveal direction="up" className="legal-page__hero-reveal">
            <nav className="public-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{document.breadcrumbLabel}</span>
            </nav>
            <p className="page-eyebrow">Legal template</p>
            <h1>{document.title}</h1>
            <p className="legal-page__warning">
              Template structure for client and qualified legal review. All language must
              be confirmed before publication.
            </p>
            <p className="legal-page__updated">
              Last updated: awaiting client and legal approval
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="warm" className="legal-page">
        <Container size="wide">
          <div className="legal-page__layout">
            <LegalSectionNavigation document={document} />
            <div className="legal-page__content">
              {document.sections.map((section) => (
                <Reveal direction="up" key={section.id} className="legal-section-reveal">
                  <LegalSection section={section} />
                </Reveal>
              ))}
              <aside className="legal-page__review-note" aria-label="Legal review status">
                <p className="page-eyebrow">Review required</p>
                <h2>Not launch-ready legal advice.</h2>
                <p>
                  Confirm the actual services, providers, jurisdiction and final wording
                  with the client and qualified legal counsel before explicit publication approval.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
