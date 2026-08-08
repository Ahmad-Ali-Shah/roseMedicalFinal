export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "x";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  labelAr: string;
  href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: "instagram", label: "Instagram", labelAr: "إنستغرام", href: "https://www.instagram.com/" },
  { platform: "facebook", label: "Facebook", labelAr: "فيسبوك", href: "https://www.facebook.com/" },
  { platform: "linkedin", label: "LinkedIn", labelAr: "لينكدإن", href: "https://www.linkedin.com/" },
  { platform: "x", label: "X / Twitter", labelAr: "إكس / تويتر", href: "https://x.com/" }
] as const;
