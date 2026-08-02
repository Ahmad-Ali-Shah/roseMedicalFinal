import { ADMIN_READINESS_ITEMS } from "@/features/admin-governance-source";

export const PUBLISHING_WORKFLOW = [
  { sequence: "01", label: "Draft", description: "Prepare a proposed public-content change." },
  { sequence: "02", label: "Review", description: "Check content, claims, contact values and affected pages." },
  { sequence: "03", label: "Public preview", description: "Inspect an unpublished representation before release." },
  { sequence: "04", label: "Explicit publish", description: "Require an intentional owner action before public release." },
  { sequence: "05", label: "Revision history", description: "Record the published change without erasing earlier history." }
] as const;

export const PUBLISHABLE_DOMAINS = [
  "Products",
  "Families",
  "Catalogues",
  "Media",
  "Website Content",
  "Contact Details"
] as const;

export const NON_PUBLISHABLE_SYSTEMS = [
  "Quotation inquiries",
  "General messages",
  "Owner authentication",
  "System settings"
] as const;

export const SENSITIVE_REVIEW_RULES = [
  "Legal wording",
  "Certification statements",
  "Manufacturing or factory claims",
  "Clinical or performance claims",
  "Export or regulatory claims",
  "Ownership or experience claims",
  "Unconfirmed contact information"
] as const;

export function getAdminPublishingModel() {
  return {
    workflow: PUBLISHING_WORKFLOW,
    domains: PUBLISHABLE_DOMAINS,
    excludedSystems: NON_PUBLISHABLE_SYSTEMS,
    sensitiveRules: SENSITIVE_REVIEW_RULES,
    blockers: ADMIN_READINESS_ITEMS
  } as const;
}
