export const ADMIN_GOVERNANCE_ROOTS = [
  "content",
  "contact-details",
  "publishing",
  "revisions",
  "settings"
] as const;

export type AdminGovernanceRoot = (typeof ADMIN_GOVERNANCE_ROOTS)[number];

export type AdminGovernanceRouteResult =
  | { kind: AdminGovernanceRoot }
  | { kind: "not-found" };

export function isAdminGovernanceRoot(value: string): value is AdminGovernanceRoot {
  return ADMIN_GOVERNANCE_ROOTS.some((root) => root === value);
}

export function resolveAdminGovernanceRoute(
  segments: readonly string[]
): AdminGovernanceRouteResult {
  if (segments.length !== 1) return { kind: "not-found" };
  const root = segments[0] ?? "";
  return isAdminGovernanceRoot(root) ? { kind: root } : { kind: "not-found" };
}
