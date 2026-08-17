import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import type { PublicLocale } from "@/features/localization";
import { Stagger, StaggerItem } from "@/features/motion";
import type { AboutDocumentModel } from "../about.data";

export function AboutDocuments({
  documents,
  locale = "en"
}: {
  documents: readonly AboutDocumentModel[];
  locale?: PublicLocale;
}): ReactElement {
  const ar = locale === "ar";

  return (
    <Section
      className="about-client-documents"
      tone="paper"
      data-section="about-client-documents"
      aria-label={ar ? "مستندات الامتثال" : "Compliance documents"}
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
                  aria-label={
                    ar
                      ? `${document.label} صورة المستند بانتظار الإضافة`
                      : `${document.label} document image pending`
                  }
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
