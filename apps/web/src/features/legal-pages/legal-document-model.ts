export interface LegalSectionRecord {
  sequence: string;
  id: string;
  title: string;
  body: string;
}

export interface LegalDocumentRecord {
  slug: "privacy" | "terms";
  title: string;
  breadcrumbLabel: string;
  sections: readonly LegalSectionRecord[];
}

function section(sequence: string, id: string, title: string): LegalSectionRecord {
  return {
    sequence,
    id,
    title,
    body: `Template guidance for ${title.toLowerCase()}. Confirm the actual website behavior, service providers, applicable jurisdiction and approved client wording through qualified legal review before publication.`
  };
}

export const PRIVACY_DOCUMENT: LegalDocumentRecord = {
  slug: "privacy",
  title: "Privacy Policy",
  breadcrumbLabel: "Privacy Policy",
  sections: [
    section("01", "information-collected", "Information collected"),
    section("02", "information-use", "How information is used"),
    section("03", "submissions", "Inquiry and contact submissions"),
    section("04", "email-communication", "Email communication"),
    section("05", "data-storage", "Data storage"),
    section("06", "cookies-analytics", "Cookies or analytics"),
    section("07", "third-party-services", "Third-party services"),
    section("08", "data-rights", "Data rights and contact route"),
    section("09", "policy-updates", "Policy updates")
  ]
};

export const TERMS_DOCUMENT: LegalDocumentRecord = {
  slug: "terms",
  title: "Terms of Website Use",
  breadcrumbLabel: "Terms of Website Use",
  sections: [
    section("01", "website-purpose", "Website purpose"),
    section("02", "product-information", "Product information"),
    section("03", "quotation-requests", "Quotation requests"),
    section("04", "no-public-pricing", "No public pricing"),
    section("05", "no-contract", "No contract formed by inquiry submission"),
    section("06", "accuracy-availability", "Accuracy and availability disclaimer"),
    section("07", "intellectual-property", "Intellectual property"),
    section("08", "external-links", "External links"),
    section("09", "liability", "Limitation of liability — awaiting legal wording"),
    section("10", "governing-law", "Governing law — awaiting legal decision"),
    section("11", "contact", "Contact")
  ]
};
