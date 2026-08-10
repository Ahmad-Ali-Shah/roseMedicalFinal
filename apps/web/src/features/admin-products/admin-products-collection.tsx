"use client";

import { useId, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui";
import {
  AdminDataTable,
  AdminPaginationPreview,
  AdminStatusBadge,
  type AdminDataTableColumn
} from "@/features/admin-primitives";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import type { AdminProductRow } from "./admin-product-model";

export interface AdminProductsCollectionProps {
  rows: readonly AdminProductRow[];
  familyNames: readonly string[];
}

const ALL_FAMILIES = "All families";

const columns: readonly AdminDataTableColumn<AdminProductRow>[] = [
  {
    key: "product",
    header: "Product",
    render: (row) => (
      <div className="admin-product-cell">
        <ProductMediaPlaceholder
          label={row.mediaLabel}
          aspect="square"
          className="admin-product-cell__media"
          src={row.mediaPath}
        />
        <div>
          <strong>{row.name}</strong>
          <span>{row.code}</span>
        </div>
      </div>
    )
  },
  {
    key: "family",
    header: "Family",
    render: (row) => (
      <ButtonLink href={row.familyHref} variant="quiet" size="small">
        {row.familyName}
      </ButtonLink>
    )
  },
  {
    key: "options",
    header: "Documented options",
    render: (row) => row.optionSummary.join(" · ")
  },
  {
    key: "catalogue",
    header: "Catalogue reference",
    render: (row) => row.catalogueReference
  },
  {
    key: "media",
    header: "Media",
    render: (row) => row.mediaLabel
  },
  {
    key: "record",
    header: "Record",
    render: () => <AdminStatusBadge tone="success">Live canonical record</AdminStatusBadge>
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="admin-table-actions">
        <ButtonLink href={row.publicHref} variant="quiet" size="small">
          View public
        </ButtonLink>
        <ButtonLink href={row.adminHref} variant="secondary" size="small">
          Open editor
        </ButtonLink>
      </div>
    )
  }
];

export function AdminProductsCollection({
  rows,
  familyNames
}: AdminProductsCollectionProps) {
  const searchId = useId();
  const filterId = useId();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState(ALL_FAMILIES);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesFamily = family === ALL_FAMILIES || row.familyName === family;
      if (!matchesFamily) return false;
      if (!normalizedQuery) return true;
      return (
        row.name.toLowerCase().includes(normalizedQuery) ||
        row.code.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [rows, query, family]);

  return (
    <>
      <section className="admin-toolbar" aria-label="Product collection controls">
        <div className="admin-control-preview">
          <label htmlFor={searchId}>Search products</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Product name or code"
          />
        </div>
        <div className="admin-control-preview">
          <label htmlFor={filterId}>Family</label>
          <select
            id={filterId}
            value={family}
            onChange={(event) => setFamily(event.target.value)}
          >
            {[ALL_FAMILIES, ...familyNames].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className="admin-collection-count">{filteredRows.length} live products</p>

      <AdminDataTable
        caption="Live canonical product records"
        captionVisibility="screen-reader"
        rows={filteredRows}
        columns={columns}
        getRowKey={(row) => row.id}
      />

      <AdminPaginationPreview label="Product collection pagination" />
    </>
  );
}
