"use client";

import { usePathname } from "next/navigation";
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
        <span>Owner session not connected</span>
        <Button size="small" variant="secondary" disabled>Sign out</Button>
      </div>
    </header>
  );
}
