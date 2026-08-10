import { Button, ButtonLink } from "@/components/ui";
import { AdminAlert } from "@/features/admin-primitives/admin-feedback";
import { AdminField } from "@/features/admin-primitives/admin-fields";
import { AdminPageHeader } from "@/features/admin-primitives/admin-page-header";
import { AdminSection } from "@/features/admin-primitives/admin-section";
import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";
import { saveContactDetail } from "./actions";

export async function AdminContactDetailsPage() {
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
    { key: "contact_phone", label: "Telephone", defaultEn: "+966 59 720 4394", defaultAr: "+966 59 720 4394" },
    { key: "contact_whatsapp", label: "WhatsApp", defaultEn: "+966 59 720 4394", defaultAr: "+966 59 720 4394" },
    { key: "contact_email", label: "Email", defaultEn: "info@rosamedical.org", defaultAr: "info@rosamedical.org" },
    { key: "contact_working_hours", label: "Working hours", defaultEn: "Sun–Thu, 09:00–17:00", defaultAr: "الأحد–الخميس، 09:00–17:00" }
  ];

  return (
    <div className="admin-contact-details-page">
      <AdminPageHeader
        eyebrow="Contact Details"
        title="Manage contact details."
        description="Saved values are used by the public contact page."
        actions={<ButtonLink href="/contact" variant="secondary">View public contact page</ButtonLink>}
      />

      <AdminAlert tone="info" title="Live contact details">
        Save each row after making a change.
      </AdminAlert>

      <AdminSection
        title="Business contact fields"
        description="Arabic falls back to the English value when left blank."
      >
        <div className="admin-contact-fields">
          {contactFields.map((field) => (
            <form key={field.key} action={saveContactDetail} className="admin-contact-field-row">
              <input type="hidden" name="key" value={field.key} />
              <h3>{field.label}</h3>
              <div className="admin-editor-grid">
                <AdminField id={`${field.key}-en`} name="value_en" label="English" defaultValue={getValEn(field.key, field.defaultEn)} required />
                <AdminField id={`${field.key}-ar`} name="value_ar" label="Arabic" defaultValue={getValAr(field.key, field.defaultAr)} direction="rtl" />
              </div>
              <Button size="small" type="submit">Save {field.label}</Button>
            </form>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}
