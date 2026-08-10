import { ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge,
  type AdminDataTableColumn
} from "@/features/admin-primitives";
import { getLiveCatalogueProducts } from "@/features/catalogue-live";
import { ProductMediaPlaceholder } from "@/features/public-catalogue";
import { getAdminFamilyRows } from "@/features/admin-families";
import { adminNewProductHref } from "@/features/admin-management-routing";
import { AdminProductsCollection } from "./admin-products-collection";
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
        actions={<ButtonLink href={adminNewProductHref()}>Add product</ButtonLink>}
      />

      <AdminAlert tone="info" title="Live canonical catalogue">
        Showing {rows.length} live products from Supabase.
      </AdminAlert>

      <AdminProductsCollection
        rows={rows}
        familyNames={families.map((family) => family.name)}
        columns={columns}
      />

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
