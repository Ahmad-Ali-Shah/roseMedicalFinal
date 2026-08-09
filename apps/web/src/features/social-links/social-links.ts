export type SocialPlatform = "instagram" | "facebook" | "linkedin" | "x";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  labelAr: string;
  href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: "instagram", label: "Instagram", labelAr: "إنستغرام", href: "https://www.instagram.com/rosa_international/" },
  { platform: "x", label: "X", labelAr: "إكس", href: "https://x.com/" },
  { platform: "facebook", label: "Facebook", labelAr: "فيسبوك", href: "https://www.facebook.com/profile.php?id=61581294504389" },
  { platform: "linkedin", label: "LinkedIn", labelAr: "لينكدإن", href: "https://www.linkedin.com/in/rosa-int-l-trading-co-370a74398/" }
] as const;
