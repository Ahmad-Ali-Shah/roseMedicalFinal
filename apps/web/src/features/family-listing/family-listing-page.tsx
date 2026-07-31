import Link from "next/link";
import type { ReactElement } from "react";
import { Container, Section } from "@/components/layout";
import { createFamilyListingData } from "./family-listing.data";
import { FamilyHero } from "./family-hero";
import { FamilyDiscoveryShell } from "./family-discovery-shell";
import { FamilyFilterPreview } from "./family-filter-preview";
import { FamilyProductGrid } from "./family-product-grid";
import { FamilyLoadingState } from "./family-loading-state";
import { FamilyNoResultsState } from "./family-no-results-state";
import { FamilySupportPanel } from "./family-support-panel";

export function FamilyListingPage({
  familySlug
}: {
  familySlug: string;
}): ReactElement | null {
  const data = createFamilyListingData(familySlug);
  if (!data) return null;

  return (
    <div className="public-page public-page--family">
      <Section tone="paper" spacing="compact" className="family-page-intro">
        <Container size="wide">
          <nav className="public-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/products">Products</Link><span aria-hidden="true">/</span><span>{data.family.name}</span>
          </nav>
          <FamilyHero family={data.family} countLabel={data.countLabel} />
        </Container>
      </Section>

      <Section tone="paper" spacing="compact">
        <Container size="wide">
          <FamilyDiscoveryShell searchLabel={data.searchLabel} countLabel={data.countLabel} />
          <div className="family-results-layout">
            <FamilyFilterPreview />
            <FamilyProductGrid family={data.family} products={data.products} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="family-review-states" aria-labelledby="family-states-title">
        <Container size="wide">
          <p className="public-eyebrow">Result states</p>
          <h2 id="family-states-title">Loading and no-result behavior.</h2>
          <div className="family-review-states__grid">
            <FamilyLoadingState />
            <FamilyNoResultsState />
          </div>
        </Container>
      </Section>

      <Section tone="paper" className="family-support-section">
        <Container size="wide"><FamilySupportPanel /></Container>
      </Section>
    </div>
  );
}
