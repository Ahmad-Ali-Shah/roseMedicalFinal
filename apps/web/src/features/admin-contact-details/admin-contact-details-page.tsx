import { Button } from "@/components/ui";
import {
  AdminAlert,
  AdminFieldPreview,
  AdminLocaleFieldPair,
  AdminPageHeader,
  AdminSection,
  AdminStatusBadge
} from "@/features/admin-primitives";
import { getAdminContactDetailsModel } from "./admin-contact-details-model";

function findValue(label: string): string {
  return getAdminContactDetailsModel().rows.find((row) => row.label === label)?.value ?? "Awaiting client confirmation";
}

export function AdminContactDetailsPage() {
  const model = getAdminContactDetailsModel();

  return (
    <div className="admin-contact-details-page">
      <AdminPageHeader
        eyebrow="Contact Details"
        title="Replace unresolved contact values safely."
        description="This page reflects the current frontend contact-information model. It does not contain live communication settings."
        actions={<Button disabled>Save draft</Button>}
      />

      <AdminAlert tone="warning" title={`${model.unresolvedCount} values await client confirmation`}>
        Unconfirmed values must remain non-actionable until verified business details are supplied.
      </AdminAlert>

      <AdminSection
        eyebrow="Current source"
        title="Business contact fields"
        description="English and Arabic structures are shown separately without inventing translated or actionable contact details."
      >
        <div className="admin-contact-fields">
          <AdminLocaleFieldPair id="business-name" label="Business name" englishValue={findValue("Business name")} arabicValue="Not supplied" />
          <AdminLocaleFieldPair id="address" label="Address" englishValue={findValue("Address")} arabicValue="Not supplied" />
          <AdminFieldPreview id="telephone" label="Telephone" value={findValue("Telephone")} />
          <AdminFieldPreview id="whatsapp" label="WhatsApp" value={findValue("WhatsApp")} />
          <AdminFieldPreview id="email" label="Email" value={findValue("Email")} />
          <AdminLocaleFieldPair id="working-hours" label="Working hours" englishValue={findValue("Working hours")} arabicValue="Not supplied" />
          <AdminFieldPreview id="social-profiles" label="Social profiles" value={findValue("Social profiles")} />
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Impact map"
        title="Affected frontend locations"
        description="Only the public Contact page currently consumes the shared contact model. Other locations remain unimplemented."
      >
        <ul className="admin-contact-impact-list">
          {model.impacts.map((impact) => (
            <li key={impact.key}>
              <div>
                <h3>{impact.label}</h3>
                <p>{impact.fields.join(" · ")}</p>
              </div>
              <AdminStatusBadge tone={impact.status === "Current frontend consumer" ? "neutral" : "warning"}>
                {impact.status}
              </AdminStatusBadge>
            </li>
          ))}
        </ul>
      </AdminSection>

      <AdminAlert tone="warning" title="Placeholder values are not contact actions">
        No telephone, email, WhatsApp, map or social-profile link is active from this admin composition.
      </AdminAlert>

      <div className="admin-management-actions">
        <Button variant="secondary" disabled>Save draft</Button>
        <Button variant="secondary" disabled>Preview affected pages</Button>
        <Button variant="secondary" disabled>Submit for review</Button>
        <Button variant="secondary" disabled>Add social profile</Button>
        <Button variant="secondary" disabled>Confirm contact value</Button>
        <Button disabled>Publish contact details</Button>
      </div>
    </div>
  );
}
