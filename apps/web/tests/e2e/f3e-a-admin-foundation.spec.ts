import { expect, test } from "@playwright/test";

const routes = ["/admin/login", "/admin/recovery", "/admin"] as const;
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
] as const;

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${route} is safe at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(route);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
      const finalContent = page.locator("main > *").last();
      await finalContent.scrollIntoViewIfNeeded();
      await expect(finalContent).toBeVisible();
    });
  }
}

test("owner-access controls are static and there is no account creation", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sign in" })).toBeDisabled();
  await expect(page.locator('a[href*="register"], a[href*="signup"]')).toHaveCount(0);

  await page.goto("/admin/recovery");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Send recovery link" })).toBeDisabled();
});

test("mobile admin navigation is fully visible without a toggle", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin");
  await expect(page.locator(".admin-navigation a")).toHaveCount(12);
  await expect(page.locator("details, summary")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /menu/i })).toHaveCount(0);
  await page.getByRole("heading", { name: "Launch readiness" }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Launch readiness" })).toBeVisible();
});

test("deferred product management route remains informational", async ({ page }) => {
  await page.goto("/admin/products");
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /save|delete|publish|create/i })).toHaveCount(0);
});
