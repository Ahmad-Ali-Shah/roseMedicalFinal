import type { ReactElement } from "react";
import { Button } from "@/components/ui";
import { ContactFieldPreview } from "./contact-field-preview";

export function ContactFormPreview(): ReactElement {
  return (
    <form className="contact-form-preview" aria-label="General contact form preview">
      <div className="contact-form-preview__grid">
        <ContactFieldPreview id="contact-name" label="Name" placeholder="Your full name" />
        <ContactFieldPreview id="contact-company" label="Company" placeholder="Company or organisation" />
        <ContactFieldPreview id="contact-email" label="Email" placeholder="Business email" />
        <ContactFieldPreview id="contact-telephone" label="Telephone" placeholder="Country code and number" />
        <ContactFieldPreview id="contact-country" label="Country" placeholder="Country" />
        <ContactFieldPreview id="contact-subject" label="Subject" placeholder="General message subject" />
      </div>
      <ContactFieldPreview id="contact-message" label="Message" placeholder="Write your message" multiline />
      <div className="contact-form-preview__actions">
        <Button disabled>Send Message</Button>
        <p>
          Online message submission is not currently available. This form is separate
          from product quotation inquiries.
        </p>
      </div>
    </form>
  );
}
