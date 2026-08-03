import { expect, test } from "@playwright/test";

test("product selection reaches the live quotation form", async ({ page }, testInfo) => {
  await page.goto("/products/knives/scalpel-handle-no-3");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  const actionScope = testInfo.project.name === "mobile"
    ? page.locator(".mobile-inquiry-bar")
    : page.locator(".product-procurement-summary");
  const addAction = actionScope.getByRole("button", { name: "Add to inquiry" });

  await expect(addAction).toBeEnabled();
  await addAction.click();

  const addedAction = actionScope.getByRole("link", { name: /Added.*View inquiry/i });
  await expect(addedAction).toHaveAttribute("href", "/inquiry");
  await addedAction.click();
  await expect(page).toHaveURL(/\/inquiry$/);

  await expect(page.getByRole("heading", { name: "Review your product inquiry." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Scalpel Handle No. 3" })).toBeVisible();
  await page.getByRole("button", { name: /Increase Scalpel Handle No. 3 quantity/i }).click();
  await expect(page.locator("[data-inquiry-line] output")).toHaveText("2");
  await page.getByPlaceholder("Optional requirement").fill("Sterile packing");

  await page.getByRole("link", { name: "Proceed to request" }).click();
  await expect(page).toHaveURL(/\/request-quotation$/);
  await expect(page.getByRole("heading", { name: "Send your product requirements." })).toBeVisible();
  await expect(page.getByText("Quantity 2")).toBeVisible();

  await page.getByPlaceholder("Your full name").fill("Test Buyer");
  await page.getByPlaceholder("name@company.com").fill("buyer@example.com");
  await page.getByPlaceholder("Country code and number").fill("+923001234567");
  await page.getByRole("checkbox").check();
  await expect(page.getByRole("button", { name: "Submit quotation request" })).toBeEnabled();
});
