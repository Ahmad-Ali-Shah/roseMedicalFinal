import { ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminPageHeader
} from "@/features/admin-primitives";
import { getLiveAdminFamilyRows } from "./admin-family-model";

export async function AdminFamiliesPage() {
  const families = await getLiveAdminFamilyRows();

  return (
    <div className="admin-families-page">
      <AdminPageHeader
        eyebrow="Families"
        title="Manage instrument families."
        description="Edit the public family names and introductions."
      />

      <AdminAlert tone="info" title="Live family records">
        {families.length} families are available.
      </AdminAlert>

      <div className="admin-family-grid">
        {families.map((family) => (
          <article
            className="admin-family-card"
            data-admin-family-card="true"
            key={family.slug}
          >
            <p className="page-eyebrow">{family.sequence}</p>
            <h2>{family.name}</h2>
            <p dir="rtl" lang="ar">{family.nameAr}</p>
            <p>{family.introduction}</p>
            <dl>
              <div><dt>Products</dt><dd>{family.productCount}</dd></div>
              <div><dt>Catalogue label</dt><dd>{family.catalogueLabel}</dd></div>
            </dl>
            <div className="admin-card-actions">
              <ButtonLink href={family.publicHref} variant="quiet" size="small">
                View public family
              </ButtonLink>
              <ButtonLink href={family.adminHref} variant="secondary" size="small">
                Open family editor
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
