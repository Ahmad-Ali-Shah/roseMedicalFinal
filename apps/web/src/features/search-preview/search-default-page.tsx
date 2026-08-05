import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/features/motion";
import { SearchFamilyShortcuts } from "./search-family-shortcuts";

export function SearchDefaultPage(): ReactElement {
  return (
    <Section tone="paper" spacing="compact" className="search-default-page">
      <Container size="wide">
        <Reveal className="search-default-page__panel" direction="up">
          <p className="page-eyebrow">Global search</p>
          <h1>Find an instrument.</h1>
          <label className="search-default-page__field">
            <span>Search the catalogue</span>
            <input
              type="search"
              readOnly
              placeholder="Product name, code, family, size or variant"
            />
          </label>
          <p className="search-default-page__status">
            Interactive catalogue search is not currently available. Start with an
            instrument family below.
          </p>
          <h2>Start with a family</h2>
          <SearchFamilyShortcuts />
        </Reveal>
      </Container>
    </Section>
  );
}
