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
  updated: string;
  introduction: string;
  sections: readonly LegalSectionRecord[];
}

function section(sequence: string, id: string, title: string, body: string): LegalSectionRecord {
  return { sequence, id, title, body };
}

export const PRIVACY_DOCUMENT: LegalDocumentRecord = {
  slug: "privacy",
  title: "Privacy Policy",
  breadcrumbLabel: "Privacy Policy",
  updated: "6 August 2026",
  introduction: "This policy explains how information submitted through the Rosa Medical website is handled for catalogue support, contact messages, and quotation requests.",
  sections: [
    section("01", "information-collected", "Information collected", "We collect the contact and organisation details you choose to provide, the contents of contact messages, and the product codes, options, quantities, and notes included in a quotation request."),
    section("02", "information-use", "How information is used", "Submitted information is used to review enquiries, prepare or discuss quotations, provide catalogue support, prevent abusive submissions, and maintain the website's business records."),
    section("03", "submissions", "Inquiry and contact submissions", "Products saved in an inquiry remain in your browser until you clear them. Information is sent to Rosa Medical only when you submit a contact form or quotation request."),
    section("04", "email-communication", "Email communication", "When you provide an email address, Rosa Medical may use it to respond to your request and continue the related business conversation. The website does not provide a public marketing-signup service."),
    section("05", "data-storage", "Data storage and security", "Reasonable technical and organisational safeguards are used for submitted information. No internet service can guarantee absolute security, so please avoid placing unnecessary sensitive personal or clinical information in free-text fields."),
    section("06", "cookies-analytics", "Browser storage and cookies", "The public inquiry uses local browser storage to preserve selected products. Authentication-related services may use essential cookies. Any future non-essential analytics or advertising technology should be disclosed before activation."),
    section("07", "third-party-services", "Service providers", "Hosting, database, authentication, and email-delivery providers may process limited information solely to operate the website and handle submitted requests, subject to their service terms and security controls."),
    section("08", "data-rights", "Your choices and contact route", "You may ask about, correct, or request deletion of information associated with a website submission by using the contact page and providing enough detail to identify the request."),
    section("09", "policy-updates", "Policy updates", "This policy may be updated when the website's services or information-handling practices change. The revision date shown on this page identifies the current published version.")
  ]
};

export const TERMS_DOCUMENT: LegalDocumentRecord = {
  slug: "terms",
  title: "Terms of Website Use",
  breadcrumbLabel: "Terms of Website Use",
  updated: "6 August 2026",
  introduction: "These terms govern use of the Rosa Medical catalogue, contact, inquiry, and quotation-request pages.",
  sections: [
    section("01", "website-purpose", "Website purpose", "This website provides product-catalogue information and a structured route for business enquiries and quotation requests. It is intended for professional product discovery and procurement preparation."),
    section("02", "product-information", "Product information", "Product names, codes, sizes, variants, and descriptions are provided to help identify instruments. Confirm final specifications, suitability, packaging, availability, and intended use during the quotation process."),
    section("03", "quotation-requests", "Quotation requests", "Submitting an inquiry asks Rosa Medical to review the listed requirements. A response may request clarification or offer different configurations before a formal quotation is issued."),
    section("04", "no-public-pricing", "No public pricing", "Prices are not displayed publicly. Pricing, currency, taxes, shipping, lead times, minimum quantities, and payment terms are supplied in a separate quotation when applicable."),
    section("05", "no-contract", "No contract formed by submission", "Saving products or submitting a website form does not create a sale, reservation, or supply contract. Any transaction is subject to a separately accepted quotation or agreement."),
    section("06", "accuracy-availability", "Accuracy and availability", "Rosa Medical aims to keep catalogue information clear and current, but information may be corrected or updated. Product availability and configurations must be confirmed before ordering."),
    section("07", "intellectual-property", "Intellectual property", "Website text, branding, layout, and original visual material may not be copied or commercially reused without permission, except where applicable law permits."),
    section("08", "external-links", "External links", "Links to third-party maps or services are provided for convenience. Third-party services operate under their own terms and privacy practices."),
    section("09", "liability", "Responsible use", "Do not misuse the website, interfere with its operation, submit unlawful content, or rely on catalogue pages as clinical instructions. Professional users remain responsible for verifying products for their requirements."),
    section("10", "governing-law", "Disputes and applicable terms", "Any binding purchase terms, governing law, and dispute provisions will be stated in the applicable quotation, invoice, or separate agreement rather than created by browsing this website."),
    section("11", "contact", "Contact", "Questions about these terms or a product request can be sent through the contact page. Include a catalogue code or quotation reference when available.")
  ]
};
