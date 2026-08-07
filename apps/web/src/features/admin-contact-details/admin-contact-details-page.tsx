import { Button, ButtonLink } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { AdminStatusBadge } from "@/features/admin-primitives/admin-status";
import { getAdminContactDetailsModel } from "./admin-contact-details-model";
import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";
import { saveContactDetail } from "./actions";

export async function AdminContactDetailsPage() {
  const model = getAdminContactDetailsModel();
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("site_settings").select("*");
  const settings = (settingsData || []) as SiteSetting[];

  const getValEn = (key: string, defaultVal: string) =>
    settings.find((s) => s.key === key)?.value_en || defaultVal;
  const getValAr = (key: string, defaultVal: string) =>
    settings.find((s) => s.key === key)?.value_ar || defaultVal;

  const contactFields = [
    { key: "contact_business_name", label: "Business name", defaultEn: "ROSA", defaultAr: "روزا ميديكال" },
    { key: "contact_address", label: "Address", defaultEn: "King Fahd Road, Olaya, Riyadh 12214, Saudi Arabia", defaultAr: "طريق الملك فهد، العليا، الرياض 12214، المملكة العربية السعودية" },
    { key: "contact_phone", label: "Telephone", defaultEn: "+966 11 000 0000", defaultAr: "+966 11 000 0000" },
    { key: "contact_whatsapp", label: "WhatsApp", defaultEn: "+966 50 000 0000", defaultAr: "+966 50 000 0000" },
    { key: "contact_email", label: "Email", defaultEn: "info@rosamedical.com", defaultAr: "info@rosamedical.com" },
    { key: "contact_working_hours", label: "Working hours", defaultEn: "Sun–Thu, 09:00–17:00", defaultAr: "الأحد–الخميس، 09:00–17:00" }
  ];

  return (
    <div className="admin-contact-details-page">
      <AdminPageHeader
        eyebrow="Contact Details"
        title="Centralized business contact management."
        description="This page controls the contact details rendered on the public Contact page and footers."
        actions={<ButtonLink href="/contact" variant="secondary">View public contact page</ButtonLink>}
      />

      <AdminAlert tone="info" title="Live Database Connection">
        Contact information is loaded live from Supabase site_settings.
      </AdminAlert>

      <AdminSection
        eyebrow="Live database records"
        title="Business contact fields"
        description="Update English and Arabic values below to publish live changes."
      >
        <div className="admin-contact-fields" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {contactFields.map((field) => (
            <form key={field.key} action={saveContactDetail} style={{ border: "1px solid #333", padding: "1rem", borderRadius: "0.5rem", background: "#111" }}>
              <input type="hidden" name="key" value={field.key} />
              <h4 style={{ margin: "0 0 0.75rem 0", color: "white" }}>{field.label}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#888", marginBottom: "0.25rem" }}>English</label>
                  <input
                    type="text"
                    name="value_en"
                    defaultValue={getValEn(field.key, field.defaultEn)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "#888", marginBottom: "0.25rem" }}>Arabic</label>
                  <input
                    type="text"
                    name="value_ar"
                    defaultValue={getValAr(field.key, field.defaultAr)}
                    dir="rtl"
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #444", background: "#1a1a1a", color: "white" }}
                  />
                </div>
              </div>
              <Button size="small" type="submit">Save {field.label}</Button>
            </form>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        eyebrow="Impact map"
        title="Affected frontend locations"
        description="The public Contact page and footer consume these shared contact records."
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
    </div>
  );
}
