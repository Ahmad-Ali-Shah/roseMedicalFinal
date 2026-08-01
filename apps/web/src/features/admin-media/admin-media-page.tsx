import { Button, ButtonLink } from "@/components/ui";
import {
  AdminAlert,
  AdminFilterPreview,
  AdminPageHeader,
  AdminSearchPreview,
  AdminSection,
  AdminStatusBadge,
  AdminToolbar
} from "@/features/admin-primitives";
import {
  getAdminMediaRequirements,
  type AdminMediaRequirement
} from "./admin-media-model";

const GROUPS: readonly {
  kind: AdminMediaRequirement["kind"];
  title: string;
  description: string;
}[] = [
  {
    kind: "product",
    title: "Product media requirements",
    description: "Requirement labels come from the product registry. They are not uploaded assets."
  },
  {
    kind: "catalogue-cover",
    title: "Catalogue cover requirements",
    description: "Cover labels come from the catalogue-document registry."
  },
  {
    kind: "family-imagery",
    title: "Family imagery requirements",
    description: "One unresolved presentation requirement is derived for each registered family."
  }
];

export function AdminMediaPage() {
  const requirements = getAdminMediaRequirements();

  return (
    <div className="admin-media-page">
      <AdminPageHeader
        eyebrow="Media library"
        title="Purpose-led media requirements."
        description="The workspace records where managed assets will be needed without fabricating files or upload history."
        actions={<Button disabled>Upload media</Button>}
      />

      <AdminAlert tone="warning" title="No managed media assets are registered.">
        The cards below are derived requirements, not asset records. No filename, size, format, alt text, usage history or upload state exists.
      </AdminAlert>

      <AdminToolbar label="Media collection controls">
        <AdminSearchPreview label="Search media" placeholder="Requirement or usage location" />
        <AdminFilterPreview id="admin-media-type" label="Requirement type" options={["All requirement types", "Product", "Catalogue cover", "Family imagery"]} />
        <AdminFilterPreview id="admin-media-completeness" label="Completeness" options={["All completeness", "Awaiting managed asset"]} />
      </AdminToolbar>

      {GROUPS.map((group) => {
        const items = requirements.filter((item) => item.kind === group.kind);
        return (
          <AdminSection
            key={group.kind}
            title={`${group.title} — ${items.length}`}
            description={group.description}
          >
            <div className="admin-media-requirements">
              {items.map((item) => (
                <article
                  className="admin-media-requirement-card"
                  data-admin-media-requirement="true"
                  key={item.key}
                >
                  <p className="page-eyebrow">Requirement</p>
                  <h3>{item.label}</h3>
                  <p>{item.sourceLabel}</p>
                  <AdminStatusBadge tone="warning">Awaiting managed asset</AdminStatusBadge>
                  <ButtonLink href={item.adminHref} variant="quiet" size="small">
                    Open related record
                  </ButtonLink>
                </article>
              ))}
            </div>
          </AdminSection>
        );
      })}

      <AdminAlert tone="neutral" title="Protected ROSA identity">
        The ROSA logo and protected identity system sit outside ordinary media management and are not counted as media assets or requirements.
      </AdminAlert>
    </div>
  );
}
