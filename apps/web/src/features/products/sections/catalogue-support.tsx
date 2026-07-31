import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import type { ProductsCatalogueModel } from "../products.data";

export function CatalogueSupport({ model }: { model: ProductsCatalogueModel }): ReactElement {
  return (
    <Section tone="paper" data-section="catalogue-support" aria-labelledby="catalogue-support-title">
      <Container size="wide">
        <div className="catalogue-support">
          <p className="public-eyebrow">{model.eyebrow}</p>
          <h2 className="public-section-heading__title" id="catalogue-support-title">{model.title}</h2>
          <p className="public-section-heading__copy">{model.copy}</p>
          <ul className="catalogue-mini-grid" aria-label="Technical catalogue families">
            {model.items.map((item) => (
              <li key={item.name}>
                <Link className="catalogue-mini-card" href={item.href} aria-label={`Browse ${item.name} catalogue`}>
                  <span className="catalogue-mini-card__number">{item.number}</span>
                  <span className="catalogue-mini-card__title">{item.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
