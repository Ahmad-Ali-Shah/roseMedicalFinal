"use client";

import { useId, useMemo, useState } from "react";
import {
  AdminDataTable,
  AdminPaginationPreview,
  type AdminDataTableColumn
} from "@/features/admin-primitives";
import type { AdminProductRow } from "./admin-product-model";

export interface AdminProductsCollectionProps {
  rows: readonly AdminProductRow[];
  familyNames: readonly string[];
  columns: readonly AdminDataTableColumn<AdminProductRow>[];
}

const ALL_FAMILIES = "All families";

export function AdminProductsCollection({
  rows,
  familyNames,
  columns
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
