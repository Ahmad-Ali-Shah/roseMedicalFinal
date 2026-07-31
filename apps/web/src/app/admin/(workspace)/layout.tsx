import { AdminShell } from "@/components/layout/admin-shell";

export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
