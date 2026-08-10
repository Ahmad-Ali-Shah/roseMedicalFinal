import { ButtonLink } from "@/components/ui";
import { AdminAlert, AdminPageHeader, AdminSection } from "@/features/admin-primitives";
import { getLiveCatalogueProducts } from "@/features/catalogue-live";
import { getAdminFamilyRows } from "@/features/admin-families";
import { adminNewProductHref } from "@/features/admin-management-routing";
import { AdminProductsCollection } from "./admin-products-collection";
import { getAdminProductRows } from "./admin-product-model";

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
