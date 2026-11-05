import { test, expect } from "@playwright/test";

test("Check the card empty state", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect
    .soft(page.getByRole("link", { name: "Cart page" }))
    .toBeVisible();
  await expect.soft(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.getByRole("link", { name: "Cart page" }).click();
  await expect.soft(page.getByText("No coffee, go add some.")).toBeVisible();
});
