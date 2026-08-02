"use client";

import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/(workspace)/logout-action";
import { Button } from "@/components/ui";
import { getAdminNavigationItem } from "./admin-navigation-model";

export function AdminWorkspaceHeader() {
  const pathname = usePathname();
  const currentItem = getAdminNavigationItem(pathname);
  return (
    <header className="admin-workspace-header">
      <div>
        <p className="admin-workspace-header__eyebrow">Current section</p>
        <strong>{currentItem?.label ?? "Owner Workspace"}</strong>
      </div>
      <div className="admin-workspace-header__session">
        <span>Owner session active</span>
        <form action={logout}>
          <Button type="submit" size="small" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
