import Link from "next/link";
import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { Stagger, StaggerItem } from "@/features/motion";
import { familyHref } from "@/features/public-catalogue";

export function SearchFamilyShortcuts(): ReactElement {
  return (
    <Stagger as="ol" className="search-family-shortcuts" aria-label="Start with a family" interval={0.045}>
      {CATALOGUE_FAMILIES.map((family) => (
        <StaggerItem as="li" key={family.slug} data-search-family-shortcut={family.slug}>
          <Link href={familyHref(family.slug)}>
            <span className="search-family-shortcuts__sequence" aria-hidden="true">{family.sequence}</span>
            <strong>{family.name}</strong>
            <span className="search-family-shortcuts__arrow" aria-hidden="true">→</span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
