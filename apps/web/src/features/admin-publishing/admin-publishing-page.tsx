import { Button, ButtonLink } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { AdminStatusBadge } from "@/features/admin-primitives/admin-status";
import { getAdminPublishingModel } from "./admin-publishing-model";

export function AdminPublishingPage() {
  const model = getAdminPublishingModel();

  return (
    <div className="admin-publishing-page">
      <AdminPageHeader
        eyebrow="Publishing Centre"
        title="Review every public change."
        description="The governed publishing sequence is documented here, but no queue, preview build or deployment action is connected."
        actions={<ButtonLink href="/" variant="secondary">View current public site</ButtonLink>}
      />

      <section className="admin-governance-empty-state" aria-labelledby="publishing-empty-title">
        <p className="page-eyebrow">Live queue</p>
        <h2 id="publishing-empty-title">No publishing queue is connected.</h2>
        <p>No draft, review, validation, preview or publication records are available from a live source.</p>
      </section>

      <AdminSection
        eyebrow="Intended governance"
        title="Draft to revision history"
        description="These stages describe the approved future workflow; they are not current record states."
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
        description="These blockers come from the shared frontend readiness model, not a live validation engine."
      >
        <ul className="admin-readiness-grid">
          {model.blockers.map((item) => (
            <li key={item.key}><h3>{item.label}</h3><AdminStatusBadge tone={item.tone}>{item.status}</AdminStatusBadge></li>
          ))}
        </ul>
      </AdminSection>

      <AdminSection eyebrow="Public content" title="Future publishable domains">
        <ul className="admin-governance-domain-list">{model.domains.map((domain) => <li key={domain}>{domain}</li>)}</ul>
      </AdminSection>

      <AdminSection eyebrow="Outside publishing" title="Operational and system data remain separate.">
        <ul className="admin-protected-list">{model.excludedSystems.map((system) => <li key={system}>{system}</li>)}</ul>
      </AdminSection>

      <AdminAlert tone="warning" title="Sensitive changes require additional review">
        <ul className="admin-sensitive-review-list">{model.sensitiveRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
      </AdminAlert>

      <div className="admin-management-actions">
        <Button variant="secondary" disabled>Open draft preview</Button>
        <Button variant="secondary" disabled>Run validation</Button>
        <Button disabled>Publish</Button>
      </div>
    </div>
  );
}
