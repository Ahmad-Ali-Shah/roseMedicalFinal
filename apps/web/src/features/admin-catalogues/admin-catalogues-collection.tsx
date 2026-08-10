"use client";

import { useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui";
import { AdminDataTable, AdminToolbar, type AdminDataTableColumn } from "@/features/admin-primitives";
import type { LiveCatalogueRow } from "./admin-catalogues-page";

const columns: readonly AdminDataTableColumn<LiveCatalogueRow>[] = [
  {
    key: "document",
    header: "Catalogue",
    render: (row) => (
      <div className="admin-catalogue-cell">
        <span className="admin-catalogue-index">{row.sequence}</span>
        <div><strong>{row.name}</strong><span lang="ar" dir="rtl">{row.familyNameAr}</span></div>
      </div>
    )
  },
  { key: "family", header: "Family", render: (row) => row.familyName },
  { key: "description", header: "Description", render: (row) => row.description },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="admin-table-actions">
        <ButtonLink href={row.publicCataloguesHref} variant="quiet" size="small">View public</ButtonLink>
        <ButtonLink href={row.adminHref} variant="secondary" size="small">Open</ButtonLink>
      </div>
    )
  }
];

export function AdminCataloguesCollection({ rows }: { rows: readonly LiveCatalogueRow[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return query ? rows.filter((row) => `${row.name} ${row.familyName} ${row.familyNameAr}`.toLocaleLowerCase().includes(query)) : rows;
  }, [rows, search]);

  return (
    <section className="admin-live-collection" aria-label="Catalogue collection">
      <AdminToolbar label="Catalogue collection controls">
        <div className="admin-control-preview">
          <label htmlFor="admin-catalogue-search">Search catalogues</label>
          <input id="admin-catalogue-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Family or catalogue title" />
        </div>
      </AdminToolbar>
      <p className="admin-collection-count" aria-live="polite">{filtered.length} of {rows.length} catalogues</p>
      {filtered.length ? <AdminDataTable caption="Catalogue records" captionVisibility="screen-reader" rows={filtered} columns={columns} getRowKey={(row) => row.familySlug} /> : <p className="admin-empty-collection">No catalogues match this search.</p>}
    </section>
  );
}
