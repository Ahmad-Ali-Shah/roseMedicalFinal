import { expect, test } from "@playwright/test";

const authRoutes = ["/admin/login", "/admin/recovery"] as const;
const protectedRoutes = [
  "/admin",
  "/admin/products",
  "/admin/families",
  "/admin/catalogues",
  "/admin/inquiries",
  "/admin/messages",
  "/admin/contact-details"
] as const;

for (const route of authRoutes) {
  test(`${route} is usable at the project viewport`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("form")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}

test("owner-access controls are live and there is no account creation", async ({ page }) => {
  await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
  await expect(page.getByLabel("Owner email")).toHaveAttribute("autocomplete", "username");
  await expect(page.getByLabel("Password")).toHaveAttribute("autocomplete", "current-password");
  await expect(page.getByRole("button", { name: "Sign in" })).toBeEnabled();
  await expect(page.locator('a[href*="register"], a[href*="signup"]')).toHaveCount(0);

  await page.goto("/admin/recovery", { waitUntil: "domcontentloaded" });
  await expect(page.getByLabel("Owner email")).toHaveAttribute("autocomplete", "email");
  await expect(page.getByRole("button", { name: "Send recovery link" })).toBeEnabled();
});

for (const route of protectedRoutes) {
  test(`${route} fails closed without an owner session`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/admin/login", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: "Sign in to the Rosa workspace." })).toBeVisible();
    await expect(page.locator(".admin-navigation")).toHaveCount(0);
  });
}
