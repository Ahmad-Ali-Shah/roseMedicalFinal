"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInquiryStatus(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const date = formData.get("appointment_date") as string;
  
  const updateData: any = { status: status };
  
  // Generate a notification string based on the action taken
  if (status === "Contacted" && date) {
    updateData.appointment_date = date;
    updateData.notification = `Meeting scheduled for ${date}`;
  } else if (status === "Closed") {
    updateData.notification = `Inquiry declined and closed`;
  } else if (status === "Reviewed") {
    updateData.notification = `Inquiry reviewed`;
  } else {
    updateData.notification = `Status updated to ${status}`;
  }
  
  const { error } = await supabase
    .from("quote_requests")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating inquiry:", error);
  }
  
  revalidatePath("/admin/inquiries");
}
