import { Button, ButtonLink } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { AdminStatusBadge } from "@/features/admin-primitives/admin-status";
import { getAdminPublishingModel } from "./admin-publishing-model";

import { triggerPublish } from "./actions";

export function AdminPublishingPage() {
  const model = getAdminPublishingModel();

  return (
    <div className="admin-publishing-page">
      <AdminPageHeader
        eyebrow="Publishing Centre"
        title="Review every public change."
        description="Trigger global revalidation and publish updates live to production."
        actions={<ButtonLink href="/" variant="secondary">View current public site</ButtonLink>}
      />

      <AdminAlert tone="info" title="Publishing Engine Connected">
        Publishing revalidates all public pages and updates site metadata in Supabase.
      </AdminAlert>

      <AdminSection
        eyebrow="Intended governance"
        title="Draft to revision history"
        description="These stages describe the approved publishing workflow."
      >
        <ol className="admin-publishing-workflow">
          {model.workflow.map((step) => (
            <li key={step.sequence}>
              <span>{step.sequence}</span>
              <div><h3>{step.label}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
      </AdminSection>

      <AdminSection
        eyebrow="Current source blockers"
        title="Known dependencies before public release"
        description="These blockers come from the shared frontend readiness model."
      >
        <ul className="admin-readiness-grid">
          {model.blockers.map((item) => (
            <li key={item.key}><h3>{item.label}</h3><AdminStatusBadge tone={item.tone}>{item.status}</AdminStatusBadge></li>
          ))}
        </ul>
      </AdminSection>

      <AdminSection eyebrow="Public content" title="Publishable domains">
        <ul className="admin-governance-domain-list">{model.domains.map((domain) => <li key={domain}>{domain}</li>)}</ul>
      </AdminSection>

      <form action={triggerPublish} className="admin-management-actions" style={{ marginTop: "2rem" }}>
        <ButtonLink href="/" variant="secondary">Open live site preview</ButtonLink>
        <Button type="submit" variant="secondary">Run validation & revalidate</Button>
        <Button type="submit">Publish changes live</Button>
      </form>
    </div>
  );
}
