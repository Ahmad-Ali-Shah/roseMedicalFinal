"use client";

import { useEffect, useState, type PropsWithChildren, type ReactElement } from "react";

interface ScrollHeaderControllerProps extends PropsWithChildren {
  className?: string;
  threshold?: number;
}

export function ScrollHeaderController({
  children,
  className = "site-header",
  threshold = 24
}: ScrollHeaderControllerProps): ReactElement {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [threshold]);

  return (
    <header
      className={className}
      data-scroll-header="true"
      data-scrolled={scrolled ? "true" : "false"}
    >
      {children}
    </header>
  );
}
