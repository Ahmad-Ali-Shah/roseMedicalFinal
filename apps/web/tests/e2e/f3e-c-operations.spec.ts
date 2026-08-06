import { expect, test } from "@playwright/test";

const routes = ["/admin/inquiries", "/admin/messages"] as const;

for (const route of routes) {
  test(`${route} protects business operations at the project viewport`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(1);
    await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}

for (const route of [
  "/admin/inquiries/EXAMPLE-INQUIRY",
  "/admin/inquiries/EXAMPLE-INQUIRY/notes",
  "/admin/messages/EXAMPLE-MESSAGE",
  "/admin/messages/EXAMPLE-MESSAGE/reply"
]) {
  test(`${route} does not disclose routing before authentication`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
}
