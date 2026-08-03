"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Container, Section } from "@/components/layout";
import { QuotationBlockedPage } from "@/features/quotation-preview";
import { clearInquiry, readInquiry, type InquiryItem } from "./inquiry-store";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function QuotationPage() {
  const [items, setItems] = useState<InquiryItem[] | null>(null);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => setItems(readInquiry()), []);

  if (items === null) {
    return <Section tone="paper"><Container size="wide"><p>Loading quotation request…</p></Container></Section>;
  }
  if (items.length === 0 && state !== "success") return <QuotationBlockedPage />;

  if (state === "success") {
    return (
      <Section tone="paper" className="quotation-blocked-page">
        <Container size="reading">
          <p className="quotation-blocked-page__eyebrow">Request received</p>
          <h1>Your quotation request has been submitted.</h1>
          <p>Rosa can now review the selected products and contact details.</p>
          {reference ? <p>Reference: {reference}</p> : null}
          <div className="quotation-blocked-page__actions">
            <Link href="/products" className="button button--primary button--standard">Browse more products</Link>
          </div>
        </Container>
      </Section>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
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

    const data = await response.json() as { error?: string; id?: string };
    if (!response.ok) {
      setError(data.error || "Unable to submit quotation request.");
      setState("error");
      return;
    }

    clearInquiry();
    setReference(data.id || "");
    setState("success");
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Section tone="paper" className="quotation-page">
      <Container size="wide">
        <div className="quotation-form-preview">
          <form className="quotation-form-preview__form" aria-label="Quotation request" onSubmit={submit}>
            <div>
              <p className="public-eyebrow">Request quotation</p>
              <h1>Send your product requirements.</h1>
              <p>Provide contact details so Rosa can review and respond to this inquiry.</p>
            </div>

            <fieldset>
              <legend>Contact information</legend>
              <div className="quotation-form-preview__field-grid">
                <label><span>Customer name</span><input name="name" required minLength={2} maxLength={120} placeholder="Your full name" /></label>
                <label><span>Company name</span><input name="company" maxLength={120} placeholder="Company or organisation" /></label>
                <label><span>Email</span><input name="email" type="email" required maxLength={254} placeholder="name@company.com" /></label>
                <label><span>Telephone</span><input name="phone" type="tel" required maxLength={30} placeholder="Country code and number" /></label>
                <label><span>Country</span><input name="country" maxLength={80} placeholder="Country" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>General request notes</legend>
              <label><span>Procurement context</span><textarea name="notes" maxLength={2000} placeholder="Packing, destination or other requirements" /></label>
            </fieldset>

            <fieldset>
              <legend>Submission</legend>
              <label className="quotation-preview-confirmation">
                <input type="checkbox" required />
                <span>I confirm that the selected product details and contact information are correct.</span>
              </label>
              {error ? <p role="alert" className="alert alert--danger">{error}</p> : null}
              <div className="quotation-form-preview__submit-row">
                <button className="button button--primary button--standard" disabled={state === "submitting"}>
                  {state === "submitting" ? "Submitting…" : "Submit quotation request"}
                </button>
              </div>
            </fieldset>
          </form>

          <aside className="quotation-product-summary" aria-labelledby="quotation-products-title">
            <p className="quotation-product-summary__eyebrow">Selected products</p>
            <h2 id="quotation-products-title">{items.length} products</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Code {item.code}</span>
                    <span>Quantity {item.quantity}</span>
                  </div>
                  <Link href="/inquiry">Edit</Link>
                </li>
              ))}
            </ul>
            <div className="quotation-product-summary__total"><span>Total quantity</span><output>{totalQuantity}</output></div>
            <Link className="text-link" href="/inquiry">Return to inquiry →</Link>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
