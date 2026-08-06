"use client";

import Image from "next/image";
import type { MouseEventHandler, ReactElement } from "react";
import { LocaleLink } from "@/features/localization";
import { ROSA_HEADER_LOGO_MEDIA } from "@/features/public-media";

export function PublicBrandMark({
  onClick
}: {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}): ReactElement {
  return (
    <LocaleLink
      className="brand brand--navigation"
      href="/"
      aria-label="Rosa homepage / صفحة روزا الرئيسية"
      {...(onClick ? { onClick } : {})}
    >
      <Image
        className="brand__image"
        src={ROSA_HEADER_LOGO_MEDIA.src}
        alt=""
        width={80}
        height={80}
        sizes="(max-width: 44rem) 3.5rem, 4rem"
        priority
      />
    </LocaleLink>
  );
}
