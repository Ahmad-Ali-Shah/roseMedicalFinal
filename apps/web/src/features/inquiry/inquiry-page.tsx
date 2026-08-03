"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, Section } from "@/components/layout";
import { EmptyInquiryPage } from "@/features/inquiry-preview";
import {
  clearInquiry,
  readInquiry,
  removeInquiryItem,
  updateInquiryItem,
  type InquiryItem
} from "./inquiry-store";

export function InquiryPage() {
  const [items, setItems] = useState<InquiryItem[] | null>(null);

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
    return <Section tone="paper"><Container size="wide"><p>Loading inquiry…</p></Container></Section>;
  }
  if (items.length === 0) return <EmptyInquiryPage />;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="populated-inquiry-preview" data-conversion-state="ready">
      <Section tone="paper" spacing="compact" className="inquiry-preview-intro">
        <Container size="wide">
          <motion.div
            className="inquiry-preview-intro__heading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34 }}
          >
            <div>
              <p className="inquiry-preview-intro__eyebrow">Quotation inquiry</p>
              <h1>Review your product inquiry.</h1>
              <p>Adjust quantities and add requirement notes before submitting.</p>
              <strong aria-live="polite">
                {items.length} unique products · {totalQuantity} total quantity
              </strong>
            </div>
            <Link href="/products" className="button button--secondary button--standard">Continue browsing</Link>
          </motion.div>
        </Container>
      </Section>

      <Section tone="paper" className="inquiry-preview-content">
        <Container size="wide">
          <div className="inquiry-preview-layout">
            <motion.div className="inquiry-preview-lines" layout>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.article
                    className="inquiry-preview-line"
                    data-inquiry-line={item.id}
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, borderWidth: 0 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className="inquiry-preview-line__identity">
                      <p className="inquiry-preview-line__family">{item.familySlug}</p>
                      <h2>{item.name}</h2>
                      <p className="inquiry-preview-line__code">Code {item.code}</p>
                      <p className="inquiry-preview-line__options">Size: {item.size || "Not specified"} · Variant: {item.variant || "Not specified"}</p>
                    </div>
                    <div className="inquiry-preview-line__controls">
                      <div className="inquiry-preview-quantity">
                        <span className="inquiry-preview-control-label">Quantity</span>
                        <div>
                          <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => setItems(updateInquiryItem(item.id, { quantity: item.quantity - 1 }))}>−</button>
                          <motion.output
                            key={`${item.id}-${item.quantity}`}
                            className="conversion-value"
                            aria-live="polite"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.16 }}
                          >
                            {item.quantity}
                          </motion.output>
                          <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => setItems(updateInquiryItem(item.id, { quantity: item.quantity + 1 }))}>+</button>
                        </div>
                      </div>
                      <label className="inquiry-preview-note">
                        <span className="inquiry-preview-control-label">Line note</span>
                        <input value={item.notes} maxLength={500} placeholder="Optional requirement" onChange={(event) => setItems(updateInquiryItem(item.id, { notes: event.target.value }))} />
                      </label>
                      <button type="button" className="text-link" onClick={() => setItems(removeInquiryItem(item.id))}>Remove</button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.aside
              className="inquiry-preview-summary"
              aria-labelledby="inquiry-summary-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.08 }}
            >
              <p className="inquiry-preview-summary__eyebrow">Inquiry summary</p>
              <h2 id="inquiry-summary-title">Ready to continue?</h2>
              <dl>
                <div><dt>Unique products</dt><dd><motion.output key={`products-${items.length}`} className="conversion-value" aria-live="polite" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{items.length}</motion.output></dd></div>
                <div><dt>Total quantity</dt><dd><motion.output key={`quantity-${totalQuantity}`} className="conversion-value" aria-live="polite" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{totalQuantity}</motion.output></dd></div>
              </dl>
              <p>Rosa will review the selected products before preparing a quotation.</p>
              <Link href="/request-quotation" className="button button--primary button--standard">Proceed to request</Link>
              <button type="button" className="text-link" onClick={() => { clearInquiry(); setItems([]); }}>Clear inquiry</button>
            </motion.aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
