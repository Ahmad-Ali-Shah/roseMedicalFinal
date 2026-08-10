"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/admin-auth";
import { revalidatePath } from "next/cache";

export async function saveContactDetail(formData: FormData) {
  const key = String(formData.get("key") || "").trim();
  const englishValue = String(formData.get("value_en") || "").trim();
  const arabicValue = String(formData.get("value_ar") || "").trim() || englishValue;
  const allowedKeys = new Set([
    "contact_business_name",
    "contact_address",
    "contact_phone",
    "contact_whatsapp",
    "contact_email",
    "contact_working_hours"
  ]);

  if (!allowedKeys.has(key) || !englishValue) throw new Error("A valid contact value is required.");

  await requireAdminUser();
  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("site_settings")
    .select("key")
    .eq("key", key)
    .maybeSingle();

  if (existing) {
    const { error } = await admin
      .from("site_settings")
      .update({
        value_en: englishValue || "",
        value_ar: arabicValue || "",
        updated_at: new Date().toISOString()
      })
      .eq("key", key);
    if (error) throw new Error(`Contact update failed: ${error.message}`);
  } else {
    const { error } = await admin
      .from("site_settings")
      .insert({
        key,
        value_en: englishValue || "",
        value_ar: arabicValue || "",
        updated_at: new Date().toISOString()
      });
    if (error) throw new Error(`Contact creation failed: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/contact-details");
  revalidatePath("/contact");
}
