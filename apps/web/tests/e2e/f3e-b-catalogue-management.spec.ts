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

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} is truthful and overflow-safe at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-preview-only]")).toHaveCount(0);
      await expect(page.locator("form, input[type=file]")).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const finalContent = page.locator("main > *").last();
      await finalContent.scrollIntoViewIfNeeded();
      await expect(finalContent).toBeVisible();
    });
  }
}

test("source totals appear in visible desktop representations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto("/admin/products");
  await expect(page.getByText("20 source products", { exact: true })).toBeVisible();
  await expect(page.locator(".admin-data-table__desktop tbody tr")).toHaveCount(20);

  await page.goto("/admin/families");
  await expect(page.locator("[data-admin-family-card]")).toHaveCount(5);

  await page.goto("/admin/catalogues");
  await expect(page.locator(".admin-data-table__desktop tbody tr")).toHaveCount(5);

  await page.goto("/admin/media");
  await expect(page.locator("[data-admin-media-requirement]")).toHaveCount(30);
  await expect(page.getByText("No managed media assets are registered.")).toBeVisible();
});

test("source tables use labelled mobile records", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin/products");
  await expect(page.locator(".admin-record-list > li")).toHaveCount(20);
  await page.goto("/admin/catalogues");
  await expect(page.locator(".admin-record-list > li")).toHaveCount(5);
});

test("representative management actions remain disabled", async ({ page }) => {
  await page.goto("/admin/products/knives/scalpel-handle-no-3");
  await expect(page.getByRole("button", { name: "Save draft" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Publish", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Upload media" })).toBeDisabled();

  await page.goto("/admin/families/knives");
  await expect(page.getByRole("button", { name: "Save draft" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Upload hero media" })).toBeDisabled();

  await page.goto("/admin/catalogues/knives");
  await expect(page.getByRole("button", { name: "Upload catalogue" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Begin safe replacement" })).toBeDisabled();

  await page.goto("/admin/media");
  await expect(page.getByRole("button", { name: "Upload media" })).toBeDisabled();
});

for (const route of [
  "/admin/products/knives",
  "/admin/products/scissors/scalpel-handle-no-3",
  "/admin/products/knives/scalpel-handle-no-3/extra",
  "/admin/families/knives/extra",
  "/admin/catalogues/knives/extra",
  "/admin/media/extra"
]) {
  test(`${route} is not found`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}
