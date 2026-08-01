import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminPageHeader
} from "@/features/admin-primitives";
import { getAdminFamilyRows } from "./admin-family-model";

export function AdminFamiliesPage() {
  const families = getAdminFamilyRows();

  return (
    <div className="admin-families-page">
      <AdminPageHeader
        eyebrow="Families"
        title="Organise the five instrument families."
        description="Every card is derived from the current source registry. No family-management action is connected."
        actions={<Button disabled>Add family</Button>}
      />

      <AdminAlert tone="warning" title="Static family registry">
        Product membership and counts are read-only source values. Publishing, visibility and featured assignments are unavailable.
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
