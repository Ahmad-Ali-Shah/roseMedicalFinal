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
import { getLiveCatalogueProducts } from "@/features/catalogue-live";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { getAdminFamilyRows } from "@/features/admin-families";
import {
  getAdminProductRows,
  type AdminProductRow
} from "./admin-product-model";

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

export async function AdminProductsListPage() {
  const products = await getLiveCatalogueProducts();
  const rows = getAdminProductRows(products);
  const families = getAdminFamilyRows();

  return (
    <div className="admin-products-page">
      <AdminPageHeader
        eyebrow="Products"
        title="Manage the instrument catalogue."
        description="This collection reads the same canonical Supabase product records used by the public catalogue."
        actions={<Button disabled>Add product</Button>}
      />

      <AdminAlert tone="info" title="Live canonical catalogue">
        Showing {rows.length} live products from Supabase.
      </AdminAlert>

      <AdminToolbar label="Product collection controls">
        <AdminSearchPreview label="Search products" placeholder="Product name or code" />
        <AdminFilterPreview
          id="admin-products-family-filter"
          label="Family"
          options={["All families", ...families.map((family) => family.name)]}
        />
      </AdminToolbar>

      <p className="admin-collection-count">{rows.length} live products</p>

      <AdminDataTable
        caption="Live canonical product records"
        captionVisibility="screen-reader"
        rows={rows}
        columns={columns}
        getRowKey={(row) => row.id}
      />

      <AdminPaginationPreview label="Product collection pagination" />

      <AdminSection
        title="Instrument families"
        eyebrow="Family summary"
        description="The five family identities and presentation remain source-controlled while product records are canonical in Supabase."
      >
        <div className="admin-family-grid admin-family-grid--summary">
          {families.map((family) => (
            <article className="admin-family-card" data-admin-family-card="true" key={family.slug}>
              <p className="page-eyebrow">{family.sequence}</p>
              <h3>{family.name}</h3>
              <p>{family.productCount} catalogue products</p>
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
