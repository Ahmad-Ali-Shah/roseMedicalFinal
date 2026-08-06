"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui";
import { ContactFieldPreview } from "./contact-field-preview";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/features/localization/locales";

type ContactStatus = "idle" | "loading" | "success" | "error";

export function ContactFormPreview() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion() === true;
  const ar = getLocaleFromPathname(usePathname()) === "ar";

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
      company_name: formData.get("company_name"),
      company: formData.get("company"),
      country: formData.get("country"),
      subject: formData.get("subject")
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
        setError(ar ? "راجع البيانات وحاول مرة أخرى." : data.error || "Failed to send");
      }
    } catch {
      setStatus("error");
      setError(ar ? "تحقق من الاتصال وحاول مرة أخرى." : "Network error");
    }
  };

  const statusMessage = status === "loading"
    ? ar ? "جارٍ إرسال رسالتك." : "Sending your message."
    : status === "success"
      ? ar ? "تم إرسال الرسالة بنجاح." : "Message sent successfully."
      : status === "error"
        ? ar ? `تعذر إرسال الرسالة. ${error}` : `Message could not be sent. ${error}`
        : "";

  return (
    <form
      className="contact-form-preview"
      onSubmit={handleSubmit}
      aria-label={ar ? "نموذج التواصل العام" : "General contact form"}
      aria-busy={status === "loading"}
    >
      <div className="hidden" aria-hidden="true">
        <input type="text" name="company_name" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="contact-form-preview__grid">
        <ContactFieldPreview id="contact-name" name="name" label={ar ? "الاسم" : "Name"} placeholder={ar ? "الاسم الكامل" : "Your full name"} required minLength={2} maxLength={120} autoComplete="name" />
        <ContactFieldPreview id="contact-company" name="company" label={ar ? "الشركة" : "Company"} placeholder={ar ? "الشركة أو المؤسسة" : "Company or organisation"} maxLength={120} autoComplete="organization" />
        <ContactFieldPreview id="contact-email" name="email" label={ar ? "البريد الإلكتروني" : "Email"} placeholder={ar ? "بريد العمل" : "Business email"} required type="email" maxLength={254} autoComplete="email" dir="ltr" />
        <ContactFieldPreview id="contact-telephone" name="phone" label={ar ? "الهاتف" : "Telephone"} placeholder={ar ? "رمز الدولة والرقم" : "Country code and number"} required type="tel" inputMode="tel" maxLength={30} autoComplete="tel" dir="ltr" />
        <ContactFieldPreview id="contact-country" name="country" label={ar ? "الدولة" : "Country"} placeholder={ar ? "الدولة" : "Country"} maxLength={80} autoComplete="country-name" />
        <ContactFieldPreview id="contact-subject" name="subject" label={ar ? "الموضوع" : "Subject"} placeholder={ar ? "موضوع الرسالة" : "General message subject"} maxLength={160} />
      </div>
      <ContactFieldPreview id="contact-message" name="message" label={ar ? "الرسالة" : "Message"} placeholder={ar ? "اكتب رسالتك" : "Write your message"} multiline required minLength={10} maxLength={4000} />
      <div className="contact-form-preview__actions">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (ar ? "جارٍ الإرسال…" : "Sending…") : (ar ? "إرسال الرسالة" : "Send Message")}
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
