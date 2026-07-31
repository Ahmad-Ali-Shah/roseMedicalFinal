import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { SectionHeading } from "@/features/public-catalogue";
import type { HomeCatalogueModel } from "../homepage.data";

export function CatalogueAccess({ model }: { model: HomeCatalogueModel }): ReactElement {
  return (
    <Section className="home-catalogues" tone="paper" data-section="catalogue-access" aria-labelledby="catalogue-access-title">
      <Container size="wide">
        <SectionHeading level={2} eyebrow={model.eyebrow} title={model.title} copy={model.copy} />
        <ul className="catalogue-grid" aria-label="Technical catalogues">
          {model.items.map((item) => (
            <li key={item.name}>
              <Link className="catalogue-card" href={item.href} aria-label={`View ${item.name} catalogue`}>
                <span className="catalogue-card__number">{item.number}</span>
                <span className="catalogue-card__title">{item.name}</span>
                <span className="catalogue-card__action">View catalogue <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
