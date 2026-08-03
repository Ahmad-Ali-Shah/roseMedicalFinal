import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal, TextReveal } from "@/features/motion";
import { CatalogueGrid } from "./catalogue-grid";
import { CatalogueGuidance } from "./catalogue-guidance";

export function CataloguesPage(): ReactElement {
  return (
    <>
      <Section tone="paper" spacing="compact" className="catalogues-intro">
        <Container size="wide">
          <Reveal direction="none" className="story-breadcrumb-reveal">
            <nav className="public-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Catalogues</span>
            </nav>
          </Reveal>
          <Reveal direction="up">
            <p className="catalogues-intro__eyebrow">Technical catalogues</p>
          </Reveal>
          <TextReveal
            as="h1"
            text="Document-led browsing, connected to the product experience."
            mode="words"
            delay={0.05}
          />
          <Reveal direction="up" delay={0.14}>
            <p className="catalogues-intro__copy">
              Use Rosa catalogues to review instrument families, codes and listed
              configurations. Each document remains connected to its web family
              for inquiry preparation.
            </p>
          </Reveal>
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-content">
        <Container size="wide">
          <CatalogueGrid />
        </Container>
      </Section>
      <Section tone="paper" className="catalogues-guidance-section">
        <Container size="wide">
          <Reveal direction="up">
            <CatalogueGuidance />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
