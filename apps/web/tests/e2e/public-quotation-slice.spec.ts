import { expect, test } from "@playwright/test";
import { INQUIRY_STORAGE_KEY } from "../../src/features/inquiry/inquiry-store";

test("product selection reaches the live quotation form", async ({ page }, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/products/knives/scalpel-handle-no-3");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  const addAction = testInfo.project.name === "mobile"
    ? page.locator(".mobile-inquiry-bar").getByRole("button", { name: "Add to inquiry" })
    : page.locator(".product-procurement-summary").getByRole("button", { name: "Add to inquiry" });

  await expect(addAction).toBeEnabled();
  await addAction.click();

  const diagnostic = await page.evaluate((storageKey) => ({
    storage: window.localStorage.getItem(storageKey),
    bodyHasAddedState: document.body.innerText.includes("Added · View inquiry"),
    addButtons: Array.from(document.querySelectorAll("button")).filter((button) => button.textContent?.includes("Add to inquiry")).length
  }), INQUIRY_STORAGE_KEY);
  console.log("INQUIRY_DIAGNOSTIC", JSON.stringify({ project: testInfo.project.name, pageErrors, diagnostic }));

  await page.goto("/inquiry");

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
