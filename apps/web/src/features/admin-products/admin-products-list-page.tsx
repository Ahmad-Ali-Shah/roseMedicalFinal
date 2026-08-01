import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminDataTable,
  AdminFilterPreview,
  AdminPageHeader,
  AdminPaginationPreview,
  AdminSearchPreview,
  AdminSection,
  AdminStatusBadge,
  AdminToolbar,
  type AdminDataTableColumn
} from "@/features/admin-primitives";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { getAdminFamilyRows } from "@/features/admin-families";
import { getAdminProductRows, type AdminProductRow } from "./admin-product-model";

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
    header: "Media requirement",
    render: (row) => row.mediaLabel
  },
  {
    key: "record",
    header: "Record",
    render: () => <AdminStatusBadge tone="neutral">Source record</AdminStatusBadge>
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

export function AdminProductsListPage() {
  const rows = getAdminProductRows();
  const families = getAdminFamilyRows();

  return (
    <div className="admin-products-page">
      <AdminPageHeader
        eyebrow="Products"
        title="Manage the instrument catalogue."
        description="This composition reflects the current source registry. It is not connected to a live content-management system."
        actions={<Button disabled>Add product</Button>}
      />

      <AdminAlert tone="warning" title="Static source registry">
        Search, filtering, pagination, creation and record changes are unavailable in this static composition.
      </AdminAlert>

      <AdminToolbar label="Product collection controls">
        <AdminSearchPreview label="Search products" placeholder="Product name or code" />
        <AdminFilterPreview
          id="admin-products-family-filter"
          label="Family"
          options={["All families", ...families.map((family) => family.name)]}
        />
      </AdminToolbar>

      <p className="admin-collection-count">{rows.length} source products</p>

      <AdminDataTable
        caption="Source-backed product records"
        captionVisibility="screen-reader"
        rows={rows}
        columns={columns}
        getRowKey={(row) => row.id}
      />

      <AdminPaginationPreview label="Product collection pagination" />

      <AdminSection
        title="Instrument families"
        eyebrow="Family summary"
        description="Counts are derived from the current product registry."
      >
        <div className="admin-family-grid admin-family-grid--summary">
          {families.map((family) => (
            <article className="admin-family-card" data-admin-family-card="true" key={family.slug}>
              <p className="page-eyebrow">{family.sequence}</p>
              <h3>{family.name}</h3>
              <p>{family.productCount} source products</p>
              <div className="admin-card-actions">
                <ButtonLink href={family.publicHref} variant="quiet" size="small">
                  View public
                </ButtonLink>
                <ButtonLink href={family.adminHref} variant="secondary" size="small">
                  Open family
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}
