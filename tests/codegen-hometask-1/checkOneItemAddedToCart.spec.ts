import { test, expect } from "@playwright/test";

// Verifies that a single Espresso added to the cart is priced correctly
// in both the checkout button total and the cart page.
test("adding one espresso to the cart - price should be shown correctly", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  // Add one Espresso; the checkout button should show its $10.00 price.
  await page.locator('[data-test="Espresso"]').click();
  await expect
    .soft(page.locator('[data-test="checkout"]'))
    .toContainText("Total: $10.00");
  // Open the cart and check the item name, quantity line, and line price.
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect.soft(page.locator("#app")).toContainText("Espresso");
  await expect.soft(page.locator("#app")).toContainText("$10.00 x 1");
  await expect.soft(page.locator("#app")).toContainText("$10.00");
});
