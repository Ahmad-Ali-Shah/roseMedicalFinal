import { redirect } from "next/navigation";

export default function ResetPasswordPage(): never {
  redirect("/admin/recovery");
}
