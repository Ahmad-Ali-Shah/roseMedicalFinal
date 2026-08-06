import { expect, test } from "@playwright/test";

const routes = [
  "/admin/products",
  "/admin/products/knives/scalpel-handle-no-3",
  "/admin/families",
  "/admin/families/knives",
  "/admin/catalogues",
  "/admin/catalogues/knives",
  "/admin/media"
] as const;

for (const route of routes) {
  test(`${route} protects catalogue management at the project viewport`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}

for (const route of [
  "/admin/products/knives",
  "/admin/products/scissors/scalpel-handle-no-3",
  "/admin/products/knives/scalpel-handle-no-3/extra",
  "/admin/families/knives/extra",
  "/admin/catalogues/knives/extra",
  "/admin/media/extra"
]) {
  test(`${route} does not disclose routing before authentication`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
}
