import { expect, test } from "@playwright/test";

const routes = [
  "/admin/content",
  "/admin/contact-details",
  "/admin/publishing",
  "/admin/revisions",
  "/admin/settings"
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

test("Website Content reflects shared source composition", async ({ page }) => {
  await page.goto("/admin/content");
  await expect(page.locator("[data-admin-content-block]")).toHaveCount(6);
  await expect(page.locator(".admin-home-composition ol li")).toHaveCount(5);
  await expect(page.getByText("Current frontend composition")).toBeVisible();
});

test("Contact Details remains unresolved and non-actionable", async ({ page }) => {
  await page.goto("/admin/contact-details");
  await expect(page.getByText(/values await client confirmation/i)).toBeVisible();
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Publish contact details" })).toBeDisabled();
});

test("Publishing Centre has workflow and blockers but no queue", async ({ page }) => {
  await page.goto("/admin/publishing");
  await expect(page.getByText("No publishing queue is connected.")).toBeVisible();
  await expect(page.locator(".admin-publishing-workflow > li")).toHaveCount(5);
  await expect(page.locator(".admin-readiness-grid > li")).toHaveCount(5);
  await expect(page.getByRole("link", { name: "View current public site" })).toHaveAttribute("href", "/");
});

test("Revision History has policy but no records", async ({ page }) => {
  await page.goto("/admin/revisions");
  await expect(page.getByText("No revision history is available.")).toBeVisible();
  await expect(page.locator("[data-admin-revision-record]")).toHaveCount(0);
  await expect(page.locator(".admin-revision-policy-list > li")).toHaveCount(6);
});

test("Settings exposes no owner identity or provider configuration", async ({ page }) => {
  await page.goto("/admin/settings");
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  await expect(page.getByRole("button", { name: "Save settings" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "Change password" })).toBeDisabled();
});

for (const route of [
  "/admin/content/example",
  "/admin/contact-details/example",
  "/admin/publishing/example",
  "/admin/revisions/example",
  "/admin/settings/example",
  "/admin/unknown"
]) {
  test(`${route} returns not found`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}
