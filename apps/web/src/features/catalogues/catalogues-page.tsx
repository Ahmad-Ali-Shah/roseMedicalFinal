import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { CatalogueGrid } from "./catalogue-grid";
import { CatalogueGuidance } from "./catalogue-guidance";

export function CataloguesPage(): ReactElement {
  return (
    <>
      <Section tone="paper" spacing="compact" className="catalogues-intro">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Catalogues</span>
          </nav>
          <p className="catalogues-intro__eyebrow">Technical catalogues</p>
          <h1>Document-led browsing, connected to the product experience.</h1>
          <p className="catalogues-intro__copy">
            Use Rosa catalogues to review instrument families, codes and listed
            configurations. Each document remains connected to its web family
            for inquiry preparation.
          </p>
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-content">
        <Container size="wide">
          <CatalogueGrid />
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-guidance-section">
        <Container size="wide">
          <CatalogueGuidance />
        </Container>
      </Section>
    </>
  );
}
