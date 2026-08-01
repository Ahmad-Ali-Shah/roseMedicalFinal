import Link from "next/link";
import type { ReactElement } from "react";
import { CATALOGUE_FAMILIES } from "@/features/catalogue-registry";
import { familyHref } from "@/features/public-catalogue";

export function SearchFamilyShortcuts(): ReactElement {
  return (
    <ol className="search-family-shortcuts" aria-label="Start with a family">
      {CATALOGUE_FAMILIES.map((family) => (
        <li key={family.slug} data-search-family-shortcut={family.slug}>
          <Link href={familyHref(family.slug)}>
            <span aria-hidden="true">{family.sequence}</span>
            <strong>{family.name}</strong>
          </Link>
        </li>
      ))}
    </ol>
  );
}
