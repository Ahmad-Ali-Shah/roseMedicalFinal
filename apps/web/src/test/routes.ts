export const routeSmokeCases = [
  "/", "/products", "/products/knives", "/products/knives/scalpel-handle-no-3", "/catalogues", "/about", "/procurement-support", "/contact", "/search", "/inquiry", "/request-quotation", "/privacy", "/terms",
  "/admin/login", "/admin/recovery", "/admin", "/admin/products", "/admin/products/knives/scalpel-handle-no-3", "/admin/families", "/admin/families/knives", "/admin/catalogues", "/admin/catalogues/knives", "/admin/media", "/admin/inquiries", "/admin/messages", "/admin/content", "/admin/contact-details", "/admin/publishing", "/admin/revisions", "/admin/settings"
] as const;

export const strictNotFoundCases = [
  "/admin/products/new",
  "/admin/products/product_scalpel_handle_3",
  "/admin/inquiries/RM-2026-0001",
  "/admin/messages/message_001"
] as const;
