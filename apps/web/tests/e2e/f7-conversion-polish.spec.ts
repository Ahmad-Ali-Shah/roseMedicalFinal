import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "rosa-medical-inquiry-v1";
const SEEDED_ITEMS = [
  {
    id: "product_scalpel_handle_3",
    familySlug: "knives",
    slug: "scalpel-handle-no-3",
    name: "Scalpel Handle No. 3",
    code: "18-0644",
    size: "14.5 cm",
    variant: "Standard",
    quantity: 1,
    notes: ""
  },
  {
    id: "product_bard_parker_handle",
    familySlug: "knives",
    slug: "bard-parker-handle",
    name: "Bard Parker Handle",
    code: "18-0650",
    size: "14.5 cm",
    variant: "Standard",
    quantity: 1,
    notes: ""
  }
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const details = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(details.scrollWidth, JSON.stringify(details)).toBeLessThanOrEqual(details.clientWidth);
}

async function readStoredInquiry(page: Page) {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as typeof SEEDED_ITEMS[number][] : null;
  }, STORAGE_KEY);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    ({ key, items }) => window.localStorage.setItem(key, JSON.stringify(items)),
    { key: STORAGE_KEY, items: SEEDED_ITEMS }
  );
});

test("inquiry edits persist immediately and quotation submission preserves its payload", async ({ page }) => {
  const inquiryResponse = await page.goto("/inquiry");
  expect(inquiryResponse?.ok()).toBe(true);

  await expect(page.getByRole("heading", { name: "Review your product inquiry.", level: 1 })).toBeVisible();
  await expect(page.locator("[data-inquiry-line]")).toHaveCount(2);
  await expect(page.locator("[data-conversion-state='ready']")).toBeVisible();

  const scalpelLine = page.locator("[data-inquiry-line='product_scalpel_handle_3']");
  await scalpelLine.getByRole("button", { name: "Increase Scalpel Handle No. 3 quantity" }).click();
  await expect(scalpelLine.locator("output")).toHaveText("2");
  await expect.poll(async () => (await readStoredInquiry(page))?.[0]?.quantity).toBe(2);

  await scalpelLine.getByPlaceholder("Optional requirement").fill("Sterile packing requested");
  await expect.poll(async () => (await readStoredInquiry(page))?.[0]?.notes).toBe("Sterile packing requested");

  const bardLine = page.locator("[data-inquiry-line='product_bard_parker_handle']");
  await bardLine.getByRole("button", { name: "Remove" }).click();
  await expect.poll(async () => (await readStoredInquiry(page))?.length).toBe(1);
  await expect(page.locator("[data-inquiry-line]")).toHaveCount(1);
  await expect(page.getByText("1 unique products · 2 total quantity")).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("link", { name: "Proceed to request" }).click();
  await expect(page.getByRole("heading", { name: "Send your product requirements.", level: 1 })).toBeVisible();
  await expect(page.locator("[data-motion='quotation-fieldset']")).toHaveCount(3);

  let submittedPayload: Record<string, unknown> | null = null;
  await page.route("**/api/checkout", async (route) => {
    submittedPayload = route.request().postDataJSON() as Record<string, unknown>;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: "RFQ-2026-001" })
    });
  });

  await page.getByLabel("Customer name").fill("Ahmad Buyer");
  await page.getByLabel("Company name").fill("Rosa Procurement Test");
  await page.getByLabel("Email").fill("buyer@example.com");
  await page.getByLabel("Telephone").fill("+92 300 0000000");
  await page.getByLabel("Country").fill("Pakistan");
  await page.getByLabel("Procurement context").fill("Please confirm packing options.");
  await page.getByRole("checkbox").check();

  const submitButton = page.locator(".quotation-submit-button");
  await submitButton.click();
  await expect(submitButton).toBeDisabled();
  await expect(submitButton).toContainText("Submitting…");
  await expect(
    page.getByRole("heading", { name: "Your quotation request has been submitted.", level: 1 })
  ).toBeVisible();
  await expect(page.getByText("Reference: RFQ-2026-001")).toBeVisible();
  await expect(page.locator("[data-conversion-success='true']")).toBeVisible();

  expect(submittedPayload).toMatchObject({
    name: "Ahmad Buyer",
    company: "Rosa Procurement Test",
    email: "buyer@example.com",
    phone: "+92 300 0000000",
    country: "Pakistan",
    notes: "Please confirm packing options.",
    items: [
      {
        id: "product_scalpel_handle_3",
        quantity: 2,
        notes: "Sterile packing requested"
      }
    ]
  });
  await expect.poll(() => page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY)).toBeNull();
  await expectNoHorizontalOverflow(page);
});
