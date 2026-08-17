import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Stagger, StaggerItem } from "@/features/motion";
import type { AboutDocumentModel } from "../about.data";

export function AboutDocuments({
  documents
}: {
  documents: readonly AboutDocumentModel[];
}): ReactElement {
  return (
    <Section
      className="about-client-documents"
      tone="paper"
      data-section="about-client-documents"
      aria-label="Compliance documents"
    >
      <Container size="wide">
        <Stagger as="ul" className="about-client-documents__grid" interval={0.05}>
          {documents.map((document) => (
            <StaggerItem as="li" key={document.id}>
              <article className="about-client-document" data-about-document={document.id}>
                <h3>{document.label}</h3>
                <div
                  className="about-client-document__preview"
                  data-media-slot={document.mediaSlot}
                  data-media-state="placeholder"
                  role="img"
                  aria-label={`${document.label} document image pending`}
                >
                  <span /><span /><span /><span /><span />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
