import { Button } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import {
  AdminFieldPreview,
  AdminLocaleFieldPair
} from "@/features/admin-primitives/admin-fields";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { AdminStatusBadge } from "@/features/admin-primitives/admin-status";
import { getAdminContactDetailsModel } from "./admin-contact-details-model";

function findValue(label: string): string {
  return getAdminContactDetailsModel().rows.find((row) => row.label === label)?.value ?? "Not supplied";
}

export function AdminContactDetailsPage() {
  const model = getAdminContactDetailsModel();

  return (
    <div className="admin-contact-details-page">
      <AdminPageHeader
        eyebrow="Contact Details"
        title="Review centralized example contact details."
        description="This page reflects the contact-information model currently rendered on the public Contact page."
        actions={<Button disabled>Save draft</Button>}
      />

      <AdminAlert tone="neutral" title={`${model.rows.length} centralized contact values`}>
        These example values can be replaced from the shared source when final business details are approved.
      </AdminAlert>

      <AdminSection
        eyebrow="Current source"
        title="Business contact fields"
        description="English values and Arabic-ready counterparts are shown from the centralized example configuration."
      >
        <div className="admin-contact-fields">
          <AdminLocaleFieldPair id="business-name" label="Business name" englishValue={findValue("Business name")} arabicValue="روزا ميديكال" />
          <AdminLocaleFieldPair id="address" label="Address" englishValue={findValue("Address")} arabicValue="طريق الملك فهد، العليا، الرياض 12214، المملكة العربية السعودية" />
          <AdminFieldPreview id="telephone" label="Telephone" value={findValue("Telephone")} />
          <AdminFieldPreview id="whatsapp" label="WhatsApp" value={findValue("WhatsApp")} />
          <AdminFieldPreview id="email" label="Email" value={findValue("Email")} />
          <AdminLocaleFieldPair id="working-hours" label="Working hours" englishValue={findValue("Working hours")} arabicValue="الأحد–الخميس، 09:00–17:00" />
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

      <AdminAlert tone="neutral" title="Public contact actions are active">
        Telephone, email, WhatsApp, social profile, and location-map links are rendered from the current example configuration.
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
