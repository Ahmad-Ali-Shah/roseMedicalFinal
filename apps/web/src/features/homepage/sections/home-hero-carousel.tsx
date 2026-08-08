"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement
} from "react";
import { useReducedMotion } from "motion/react";
import { LocalizedButtonLink, type PublicLocale } from "@/features/localization";
import {
  HOME_HERO_SLIDES,
  localizeHomeHeroSlide,
  type LocalizedHomeHeroSlide
} from "../home-hero-slides";
import {
  HERO_AUTOPLAY_MS,
  nextHeroSlideIndex,
  previousHeroSlideIndex,
  shouldHeroAutoplay
} from "../hero-carousel-state";

const DRAG_THRESHOLD_PX = 48;

function preferredHeroSource(slide: LocalizedHomeHeroSlide): string {
  return window.matchMedia("(max-width: 40rem)").matches
    ? slide.image.mobileSrc
    : slide.image.desktopSrc;
}

export function HomeHeroCarousel({
  locale = "en"
}: {
  locale?: PublicLocale;
}): ReactElement {
  const slides = useMemo(
    () => HOME_HERO_SLIDES.map((slide) => localizeHomeHeroSlide(slide, locale)),
    [locale]
  );
  const reducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [manualEpoch, setManualEpoch] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const preloadRequest = useRef(0);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateWhenReady = useCallback((index: number, manual = false) => {
    if (index === activeIndex) {
      if (manual) setManualEpoch((epoch) => epoch + 1);
      return;
    }

    const request = ++preloadRequest.current;
    const source = preferredHeroSource(slides[index] ?? slides[0]!);
    const image = new window.Image();
    image.decoding = "async";
    image.src = source;

    const activate = () => {
      if (preloadRequest.current !== request) return;
      setActiveIndex(index);
      if (manual) setManualEpoch((epoch) => epoch + 1);
    };

    if (image.complete) {
      activate();
      return;
    }

    image.onload = activate;
    image.onerror = activate;
  }, [activeIndex, slides]);

  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!shouldHeroAutoplay({
      reducedMotion,
      hovered,
      focused,
      dragging,
      hidden
    })) {
      return;
    }

    const timeout = window.setTimeout(() => {
      activateWhenReady(nextHeroSlideIndex(activeIndex, slides.length));
    }, HERO_AUTOPLAY_MS);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, activateWhenReady, dragging, focused, hidden, hovered, manualEpoch, reducedMotion, slides.length]);

  const handleDotKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const index = event.key === "ArrowRight"
      ? nextHeroSlideIndex(activeIndex, slides.length)
      : previousHeroSlideIndex(activeIndex, slides.length);
    activateWhenReady(index, true);
    dotRefs.current[index]?.focus();
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as Element).closest("button, a")) return;
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const finishPointer = (event: PointerEvent<HTMLElement>) => {
    const startX = pointerStartX.current;
    const startY = pointerStartY.current;
    pointerStartX.current = null;
    pointerStartY.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (startX === null || startY === null) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;
    activateWhenReady(
      deltaX < 0
        ? nextHeroSlideIndex(activeIndex, slides.length)
        : previousHeroSlideIndex(activeIndex, slides.length),
      true
    );
  };

  const slide = slides[activeIndex] ?? slides[0]!;
  const slideStyle = {
    "--hero-desktop-focal": slide.image.desktopFocalPoint,
    "--hero-mobile-focal": slide.image.mobileFocalPoint
  } as CSSProperties;

  return (
    <section
      className="home-hero public-hero home-hero-carousel"
      data-section="home-hero"
      data-home-choreography="carousel"
      data-active-slide={slide.id}
      aria-roledescription="carousel"
      aria-labelledby="home-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={finishPointer}
      onPointerCancel={() => {
        pointerStartX.current = null;
        pointerStartY.current = null;
        setDragging(false);
      }}
    >
      <div
        className="home-hero-carousel__slide"
        data-copy-side={slide.copySide}
        data-tone={slide.tone}
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${slides.length}`}
        style={slideStyle}
      >
        <div className="home-hero-carousel__media" data-media-slot="homepage-hero-active">
          <picture>
            <source media="(max-width: 40rem)" srcSet={slide.image.mobileSrc} />
            <Image
              src={slide.image.desktopSrc}
              alt={slide.image.alt}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </picture>
        </div>
        <span className="home-hero-carousel__overlay" aria-hidden="true" />
        <div className="home-hero-carousel__content">
          <div className="home-hero-carousel__copy">
            <p className="public-eyebrow">{slide.eyebrow}</p>
            <h1 className="home-hero__title" id="home-title">{slide.title}</h1>
            <p className="home-hero__copy-text">{slide.copy}</p>
            <div className="home-hero__actions">
              {slide.ctas.map((cta) => (
                <LocalizedButtonLink
                  key={`${slide.id}-${cta.href}`}
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                >
                  {cta.label}
                </LocalizedButtonLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="home-hero-carousel__dots"
        role="group"
        aria-label={locale === "ar" ? "شرائح الصفحة الرئيسية" : "Homepage hero slides"}
        onKeyDown={handleDotKeyDown}
      >
        {slides.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { dotRefs.current[index] = node; }}
            type="button"
            className="home-hero-carousel__dot"
            aria-label={locale === "ar" ? `الشريحة ${index + 1}` : `Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => activateWhenReady(index, true)}
          >
            <span className="sr-only">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
