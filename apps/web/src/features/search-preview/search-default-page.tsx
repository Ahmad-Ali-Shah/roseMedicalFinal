import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { SearchFamilyShortcuts } from "./search-family-shortcuts";

export function SearchDefaultPage(): ReactElement {
  return (
    <Section tone="paper" spacing="compact" className="search-default-page">
      <Container size="wide">
        <div className="search-default-page__panel">
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
        </div>
      </Container>
    </Section>
  );
}
