import { test, expect } from "@playwright/test";

test("Check adding one item to the cart - price should be shown correctly", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await expect
    .soft(page.locator('[data-test="checkout"]'))
    .toContainText("Total: $10.00");
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect.soft(page.locator("#app")).toContainText("Espresso");
  await expect.soft(page.locator("#app")).toContainText("$10.00 x 1");
  await expect.soft(page.locator("#app")).toContainText("$10.00");
});
