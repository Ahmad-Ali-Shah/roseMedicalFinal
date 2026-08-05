"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container, Section } from "@/components/layout";
import { QuotationBlockedPage } from "@/features/quotation-preview";
import { clearInquiry, readInquiry, type InquiryItem } from "./inquiry-store";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function QuotationPage() {
  const [items, setItems] = useState<InquiryItem[] | null>(null);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    const synchronize = () => setItems(readInquiry());
    const timeout = window.setTimeout(synchronize, 0);
    window.addEventListener("rosa-inquiry-change", synchronize);
    window.addEventListener("storage", synchronize);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("rosa-inquiry-change", synchronize);
      window.removeEventListener("storage", synchronize);
    };
  }, []);

  if (items === null) {
    return <Section tone="paper"><Container size="wide"><p>Loading quotation request…</p></Container></Section>;
  }
  if (items.length === 0 && state !== "success") return <QuotationBlockedPage />;

  if (state === "success") {
    return (
      <Section tone="paper" className="quotation-blocked-page quotation-success-state">
        <Container size="reading">
          <motion.div
            className="quotation-success-state__content"
            data-conversion-success="true"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.34 }}
          >
            <motion.span
              className="quotation-success-state__mark"
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.04 }}
            >
              ✓
            </motion.span>
            <p className="quotation-blocked-page__eyebrow">Request received</p>
            <h1>Your quotation request has been submitted.</h1>
            <p>Rosa can now review the selected products and contact details.</p>
            {reference ? <p>Reference: {reference}</p> : null}
            <div className="quotation-blocked-page__actions">
              <Link href="/products" className="button button--primary button--standard">Browse more products</Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          email: form.get("email"),
          phone: form.get("phone"),
          country: form.get("country"),
          notes: form.get("notes"),
          items
        })
      });

      const data = await response.json().catch(() => ({})) as { error?: string; id?: string };
      if (!response.ok) {
        setError(data.error || "Unable to submit quotation request.");
        setState("error");
        return;
      }

      clearInquiry();
      setReference(data.id || "");
      setState("success");
    } catch {
      setError("Unable to submit quotation request. Check your connection and try again.");
      setState("error");
    }
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Section tone="paper" className="quotation-page">
      <Container size="wide">
        <div className="quotation-form-preview" data-conversion-state={state}>
          <form
            className="quotation-form-preview__form"
            aria-label="Quotation request"
            aria-busy={state === "submitting"}
            onSubmit={submit}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.32 }}
            >
              <p className="public-eyebrow">Request quotation</p>
              <h1>Send your product requirements.</h1>
              <p>Provide contact details so Rosa can review and respond to this inquiry.</p>
            </motion.div>

            <motion.div
              className="quotation-form-preview__fields"
              data-motion="quotation-form-fields"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <fieldset data-quotation-fieldset="contact">
                <legend>Contact information</legend>
                <div className="quotation-form-preview__field-grid">
                  <label><span>Customer name</span><input name="name" required minLength={2} maxLength={120} placeholder="Your full name" /></label>
                  <label><span>Company name</span><input name="company" maxLength={120} placeholder="Company or organisation" /></label>
                  <label><span>Email</span><input name="email" type="email" required maxLength={254} placeholder="name@company.com" /></label>
                  <label><span>Telephone</span><input name="phone" type="tel" required maxLength={30} placeholder="Country code and number" /></label>
                  <label><span>Country</span><input name="country" maxLength={80} placeholder="Country" /></label>
                </div>
              </fieldset>

              <fieldset data-quotation-fieldset="notes">
                <legend>General request notes</legend>
                <label><span>Procurement context</span><textarea name="notes" maxLength={2000} placeholder="Packing, destination or other requirements" /></label>
              </fieldset>

              <fieldset data-quotation-fieldset="submission">
                <legend>Submission</legend>
                <label className="quotation-preview-confirmation">
                  <input type="checkbox" required />
                  <span>I confirm that the selected product details and contact information are correct.</span>
                </label>
                <AnimatePresence initial={false}>
                  {error ? (
                    <motion.p
                      key="quotation-error"
                      role="alert"
                      className="alert alert--danger"
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                      transition={{ duration: reduceMotion ? 0 : 0.16 }}
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <div className="quotation-form-preview__submit-row">
                  <button className="button button--primary button--standard quotation-submit-button" disabled={state === "submitting"}>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span
                        key={state === "submitting" ? "submitting" : "ready"}
                        className="quotation-submit-button__label"
                        initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                        transition={{ duration: reduceMotion ? 0 : 0.16 }}
                      >
                        {state === "submitting" ? "Submitting…" : "Submit quotation request"}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
              </fieldset>
            </motion.div>
          </form>

          <motion.aside
            className="quotation-product-summary"
            aria-labelledby="quotation-products-title"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.34, delay: reduceMotion ? 0 : 0.06 }}
          >
            <p className="quotation-product-summary__eyebrow">Selected products</p>
            <h2 id="quotation-products-title">{items.length} products</h2>
            <ul>
              {items.map((item) => (
                <motion.li layout={!reduceMotion} key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Code {item.code}</span>
                    <span>Quantity {item.quantity}</span>
                  </div>
                  <Link href="/inquiry">Edit</Link>
                </motion.li>
              ))}
            </ul>
            <div className="quotation-product-summary__total"><span>Total quantity</span><motion.output key={totalQuantity} className="conversion-value" aria-live="polite" initial={reduceMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{totalQuantity}</motion.output></div>
            <Link className="text-link" href="/inquiry">Return to inquiry →</Link>
          </motion.aside>
        </div>
      </Container>
    </Section>
  );
}
