import { expect, test } from "@playwright/test";

const routes = ["/admin/inquiries", "/admin/messages"] as const;
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
      await expect(page.locator("form, table, input[type=file]")).toHaveCount(0);
      await expect(page.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      await expect(page.getByText("Owner session not connected")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const finalContent = page.locator("main > *").last();
      await finalContent.scrollIntoViewIfNeeded();
      await expect(finalContent).toBeVisible();
    });
  }
}

test("Inquiries exposes only truthful empty-state controls and workflow", async ({ page }) => {
  await page.goto("/admin/inquiries");
  await expect(page.getByRole("heading", { name: "No live quotation inquiries are available." })).toBeVisible();
  await expect(page.getByLabel("Search inquiries")).toHaveAttribute("readonly", "");
  await expect(page.getByLabel("Status")).toBeDisabled();
  await expect(page.getByLabel("Country")).toBeDisabled();
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  const workflow = page.locator(".admin-operations-workflow__list");
  for (const status of ["New", "Reviewed", "Contacted", "Closed"]) {
    await expect(workflow.getByText(status, { exact: true })).toBeVisible();
  }
  await expect(page.getByText(/0 inquiries|0 new|4 inquiries|Last synced/i)).toHaveCount(0);
});

test("Messages stays separate and makes conversion guidance non-operational", async ({ page }) => {
  await page.goto("/admin/messages");
  await expect(page.getByRole("heading", { name: "No live general messages are available." })).toBeVisible();
  await expect(page.getByLabel("Search messages")).toHaveAttribute("readonly", "");
  await expect(page.getByLabel("Status")).toBeDisabled();
  await expect(page.getByText("Remain in General Messages")).toBeVisible();
  await expect(page.getByText("Use the Quotation Inquiry flow")).toBeVisible();
  const workflow = page.locator(".admin-operations-workflow__list");
  for (const status of ["New", "Read", "Replied", "Closed"]) {
    await expect(workflow.getByText(status, { exact: true })).toBeVisible();
  }
  await expect(page.getByText(/0 messages|All caught up|Inbox empty|Last synced/i)).toHaveCount(0);
});

for (const route of [
  "/admin/inquiries/EXAMPLE-INQUIRY",
  "/admin/inquiries/EXAMPLE-INQUIRY/notes",
  "/admin/messages/EXAMPLE-MESSAGE",
  "/admin/messages/EXAMPLE-MESSAGE/reply"
]) {
  test(`${route} is not found`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}
