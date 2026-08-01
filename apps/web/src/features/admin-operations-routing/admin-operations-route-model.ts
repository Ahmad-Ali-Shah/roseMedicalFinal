export const ADMIN_OPERATIONS_ROOTS = ["inquiries", "messages"] as const;

export type AdminOperationsRoot = (typeof ADMIN_OPERATIONS_ROOTS)[number];

export type AdminOperationsRouteResult =
  | { kind: "inquiries" }
  | { kind: "messages" }
  | { kind: "not-found" };

export function isAdminOperationsRoot(
  value: string
): value is AdminOperationsRoot {
  return (ADMIN_OPERATIONS_ROOTS as readonly string[]).includes(value);
}

export function resolveAdminOperationsRoute(
  segments: readonly string[]
): AdminOperationsRouteResult {
  if (segments.length === 1 && segments[0] === "inquiries") {
    return { kind: "inquiries" };
  }

  if (segments.length === 1 && segments[0] === "messages") {
    return { kind: "messages" };
  }

  return { kind: "not-found" };
}
