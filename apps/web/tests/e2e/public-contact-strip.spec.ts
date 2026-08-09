import { expect, test } from "@playwright/test";

const SOCIAL_DESTINATIONS = {
  Instagram: "https://www.instagram.com/rosa_international/",
  X: "https://x.com/",
  Facebook: "https://www.facebook.com/profile.php?id=61581294504389",
  LinkedIn: "https://www.linkedin.com/in/rosa-int-l-trading-co-370a74398/"
} as const;

test("contact strip connects every public page to Rosa", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop contact-strip contract.");

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/about");

  const strip = page.locator(".public-contact-strip");
  await expect(strip).toHaveAttribute("data-motion", "reveal");
  await expect(strip.locator('[data-motion="stagger-item"]')).toHaveCount(3);
  const initialOffset = await strip.evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).m42);
  expect(initialOffset).toBeGreaterThan(0);
  await strip.scrollIntoViewIfNeeded();
  await expect.poll(
    () => strip.evaluate((node) => Math.abs(new DOMMatrix(getComputedStyle(node).transform).m42))
  ).toBeLessThan(0.5);
  await expect(strip.getByRole("heading", { name: "Contact us" })).toBeVisible();
  await expect(strip.getByRole("link", { name: "info@rosamedical.org" })).toHaveAttribute(
    "href",
    "mailto:info@rosamedical.org"
  );
  await expect(strip.getByRole("link", { name: "+966 59 720 4394" })).toHaveAttribute(
    "href",
    "tel:+966597204394"
  );

  for (const [label, href] of Object.entries(SOCIAL_DESTINATIONS)) {
    await expect(strip.getByRole("link", { name: label, exact: true })).toHaveAttribute(
      "href",
      href
    );
  }

  await expect(strip.locator("[data-social-icon]")).toHaveCount(4);
  await expect(strip.locator("xpath=following-sibling::footer[1]")).toHaveCount(1);

  const instagramIcon = strip
    .getByRole("link", { name: "Instagram", exact: true })
    .locator(".social-links-row__icon");
  await instagramIcon.hover();
  await expect.poll(async () => instagramIcon.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
  await strip.screenshot({ path: testInfo.outputPath("contact-strip-desktop.png") });
});

test("contact details and socials remain composed on a phone", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile contact-strip contract.");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");

  const strip = page.locator(".public-contact-strip");
  await strip.scrollIntoViewIfNeeded();
  await expect(strip).toBeVisible();
  await expect(strip.locator("[data-social-icon]")).toHaveCount(4);
  await expect(strip.getByRole("link", { name: "info@rosamedical.org" })).toBeVisible();
  await expect(strip.getByRole("link", { name: "+966 59 720 4394" })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
  await strip.screenshot({ path: testInfo.outputPath("contact-strip-mobile.png") });
});
