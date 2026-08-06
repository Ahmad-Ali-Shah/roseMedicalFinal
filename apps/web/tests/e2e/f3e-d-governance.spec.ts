import { expect, test } from "@playwright/test";

const routes = [
  "/admin/content",
  "/admin/contact-details",
  "/admin/publishing",
  "/admin/revisions",
  "/admin/settings"
] as const;

for (const route of routes) {
  test(`${route} protects governance at the project viewport`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}

for (const route of [
  "/admin/content/example",
  "/admin/contact-details/example",
  "/admin/publishing/example",
  "/admin/revisions/example",
  "/admin/settings/example",
  "/admin/unknown"
]) {
  test(`${route} does not disclose routing before authentication`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
}
