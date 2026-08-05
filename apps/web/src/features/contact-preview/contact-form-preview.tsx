"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui";
import { ContactFieldPreview } from "./contact-field-preview";

type ContactStatus = "idle" | "loading" | "success" | "error";

export function ContactFormPreview() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion() === true;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setError("");
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      company_name: formData.get("company_name")
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error || "Failed to send");
      }
    } catch {
      setStatus("error");
      setError("Network error");
    }
  };

  const statusMessage = status === "loading"
    ? "Sending your message."
    : status === "success"
      ? "Message sent successfully."
      : status === "error"
        ? `Message could not be sent. ${error}`
        : "";

  return (
    <form
      className="contact-form-preview"
      onSubmit={handleSubmit}
      aria-label="General contact form preview"
      aria-busy={status === "loading"}
    >
      <div className="hidden" aria-hidden="true">
        <input type="text" name="company_name" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="contact-form-preview__grid">
        <ContactFieldPreview id="contact-name" name="name" label="Name" placeholder="Your full name" required />
        <ContactFieldPreview id="contact-company" name="company" label="Company" placeholder="Company or organisation" />
        <ContactFieldPreview id="contact-email" name="email" label="Email" placeholder="Business email" required type="email" />
        <ContactFieldPreview id="contact-telephone" name="phone" label="Telephone" placeholder="Country code and number" required />
        <ContactFieldPreview id="contact-country" name="country" label="Country" placeholder="Country" />
        <ContactFieldPreview id="contact-subject" name="subject" label="Subject" placeholder="General message subject" />
      </div>
      <ContactFieldPreview id="contact-message" name="message" label="Message" placeholder="Write your message" multiline required />
      <div className="contact-form-preview__actions">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send Message"}
        </Button>
        <div
          className="contact-form-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-contact-status={status}
        >
          <AnimatePresence initial={false} mode="wait">
            {statusMessage ? (
              <motion.p
                className={`contact-form-status__message contact-form-status__message--${status}`}
                key={status}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.18,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {statusMessage}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
