import { ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminPageHeader,
  AdminSection,
} from "@/features/admin-primitives";
import { getAdminCatalogueProducts } from "@/features/catalogue-live";
import { getLiveAdminFamilyRows } from "@/features/admin-families";
import { adminNewProductHref } from "@/features/admin-management-routing";
import { getAdminProductRows } from "./admin-product-model";
import { AdminProductsCollection } from "./admin-products-collection";

export async function AdminProductsListPage() {
  const products = await getAdminCatalogueProducts();
  const rows = getAdminProductRows(products);
  const families = await getLiveAdminFamilyRows();

  return (
    <div className="admin-products-page">
      <AdminPageHeader
        eyebrow="Products"
        title="Manage products."
        description="Search, filter, add, edit, activate, or remove catalogue products."
        actions={<ButtonLink href={adminNewProductHref()}>Add product</ButtonLink>}
      />

      <AdminAlert tone="info" title="Live product records">
        {rows.length} products are available.
      </AdminAlert>

      <AdminProductsCollection rows={rows} families={families.map(({ slug, name }) => ({ slug, name }))} />

      <AdminSection
        title="Instrument families"
        eyebrow="Family summary"
        description="Open a family to edit its name or introduction."
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
