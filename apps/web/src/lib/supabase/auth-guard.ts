import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const temporaryOwnerEmail = "ahmadaliofficial1155@gmail.com";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const ownerUserId = process.env.ROSA_OWNER_USER_ID?.trim();
  const ownerEmail = (process.env.ROSA_OWNER_EMAIL || temporaryOwnerEmail)
    .trim()
    .toLowerCase();
  const matchesOwnerId = Boolean(user && ownerUserId && user.id === ownerUserId);
  const matchesOwnerEmail = user?.email?.trim().toLowerCase() === ownerEmail;

  if (!user || (!matchesOwnerId && !matchesOwnerEmail)) {
    redirect("/admin/login");
  }

  return user;
}
