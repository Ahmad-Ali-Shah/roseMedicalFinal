import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminDataTable,
  AdminFilterPreview,
  AdminPageHeader,
  AdminSearchPreview,
  AdminStatusBadge,
  AdminToolbar,
  type AdminDataTableColumn
} from "@/features/admin-primitives";
import {
  getAdminCatalogueRows,
  type AdminCatalogueRow
} from "./admin-catalogue-model";

const columns: readonly AdminDataTableColumn<AdminCatalogueRow>[] = [
  {
    key: "document",
    header: "Document",
    render: (row) => (
      <div className="admin-catalogue-cell">
        <div className="admin-catalogue-cover-placeholder" role="img" aria-label={row.coverLabel}>
          <span>{row.sequence}</span>
        </div>
        <div>
          <strong>{row.name}</strong>
          <span>{row.familyName}</span>
        </div>
      </div>
    )
  },
  { key: "description", header: "Description", render: (row) => row.description },
  { key: "cover", header: "Cover requirement", render: (row) => row.coverLabel },
  { key: "source", header: "Source", render: (row) => row.sourceStatus },
  {
    key: "availability",
    header: "PDF availability",
    render: (row) => (
      <AdminStatusBadge tone={row.availability === "Awaiting publication" ? "warning" : "neutral"}>
        {row.availability}
      </AdminStatusBadge>
    )
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="admin-table-actions">
        <ButtonLink href={row.publicCataloguesHref} variant="quiet" size="small">Public catalogues</ButtonLink>
        <ButtonLink href={row.publicFamilyHref} variant="quiet" size="small">Public family</ButtonLink>
        <ButtonLink href={row.adminHref} variant="secondary" size="small">Open record</ButtonLink>
      </div>
    )
  }
];

export function AdminCataloguesPage() {
  const rows = getAdminCatalogueRows();

  return (
    <div className="admin-catalogues-page">
      <AdminPageHeader
        eyebrow="Catalogues"
        title="Maintain technical document records."
        description="These five records describe source catalogue requirements. No file-management workflow is connected."
        actions={<Button disabled>Upload catalogue</Button>}
      />

      <AdminAlert tone="warning" title="Static catalogue records">
        PDF availability is derived only from a registered public path. No upload, processing, replacement or publication history is represented.
      </AdminAlert>

      <AdminToolbar label="Catalogue collection controls">
        <AdminSearchPreview label="Search catalogues" placeholder="Family or catalogue title" />
        <AdminFilterPreview
          id="admin-catalogue-availability"
          label="PDF availability"
          options={["All availability", "Public PDF path registered", "Awaiting publication"]}
        />
      </AdminToolbar>

      <p className="admin-collection-count">{rows.length} source catalogue records</p>

      <AdminDataTable
        caption="Source-backed catalogue records"
        captionVisibility="screen-reader"
        rows={rows}
        columns={columns}
        getRowKey={(row) => row.familySlug}
      />
    </div>
  );
}
