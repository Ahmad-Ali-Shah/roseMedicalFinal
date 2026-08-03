import Image from "next/image";
import type { PropsWithChildren, ReactElement } from "react";

type MediaAspect = "landscape" | "portrait" | "square" | "cinematic";
type MediaTone = "light" | "dark" | "mist";
type MediaOverlay = "none" | "soft" | "dark";

interface MediaFrameProps extends PropsWithChildren {
  src?: string;
  alt: string;
  aspect: MediaAspect;
  focalPoint?: string;
  tone?: MediaTone;
  overlay?: MediaOverlay;
  mediaSlot?: string;
  className?: string;
  loading?: "eager" | "lazy";
  sizes?: string;
}

export function MediaFrame({
  src,
  alt,
  aspect,
  focalPoint = "50% 50%",
  tone = "mist",
  overlay = "none",
  mediaSlot,
  className,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, 50vw",
  children
}: MediaFrameProps): ReactElement {
  const classes = ["media-frame", className].filter(Boolean).join(" ");
  const state = src ? "ready" : "placeholder";

  return (
    <div
      className={classes}
      data-media-aspect={aspect}
      data-media-state={state}
      data-media-tone={tone}
      {...(mediaSlot ? { "data-media-slot": mediaSlot } : {})}
      {...(!src ? { role: "img", "aria-label": alt } : {})}
    >
      {src ? (
        <Image
          className="media-frame__image"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={loading === "eager"}
          style={{ objectPosition: focalPoint }}
        />
      ) : (
        <div className="media-frame__placeholder">{children}</div>
      )}
      {overlay !== "none" ? (
        <span
          aria-hidden="true"
          className="media-frame__overlay"
          data-media-overlay={overlay}
        />
      ) : null}
    </div>
  );
}
