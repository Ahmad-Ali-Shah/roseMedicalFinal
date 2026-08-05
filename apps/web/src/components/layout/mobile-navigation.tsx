"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ReactElement
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { MOTION_DURATION, MOTION_EASING } from "@/features/motion";
import { isPublicNavigationActive } from "./public-navigation-link";

export type NavigationItem = readonly [label: string, href: Route<string>];

interface MobileNavigationProps {
  primaryLinks: readonly NavigationItem[];
  utilityLinks: readonly NavigationItem[];
}

export function MobileNavigation({
  primaryLinks,
  utilityLinks
}: MobileNavigationProps): ReactElement {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpenPath(null);

  return (
    <div className="mobile-navigation">
      <button
        ref={triggerRef}
        type="button"
        className="mobile-navigation__trigger"
        aria-expanded={open}
        aria-controls="rosa-mobile-navigation"
        onClick={() => setOpenPath(open ? null : pathname)}
      >
        <span>Menu</span>
        <span className="mobile-navigation__trigger-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              className="mobile-navigation__backdrop"
              aria-label="Close menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              ref={panelRef}
              id="rosa-mobile-navigation"
              className="mobile-navigation__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: MOTION_DURATION.section,
                ease: MOTION_EASING.emphasized
              }}
            >
              <div className="mobile-navigation__panel-header">
                <Link className="brand" href="/" onClick={close}>ROSA</Link>
                <button type="button" className="mobile-navigation__close" onClick={close}>
                  Close
                </button>
              </div>
              <nav aria-label="Mobile navigation">
                <ul className="mobile-navigation__links">
                  {[...primaryLinks, ...utilityLinks].map(([label, href], index) => (
                    <motion.li
                      key={href}
                      initial={reduceMotion ? false : { opacity: 1, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.08 + index * 0.045,
                        duration: MOTION_DURATION.component,
                        ease: MOTION_EASING.standard
                      }}
                    >
                      <Link
                        href={href}
                        onClick={close}
                        aria-current={isPublicNavigationActive(pathname, href) ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <ButtonLink href="/request-quotation" onClick={close}>
                Request a quote
              </ButtonLink>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
