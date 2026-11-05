import { test, expect } from "@playwright/test";

test("Verify the ability to checkout - the success message appears", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).fill("test");
  await page.getByRole("textbox", { name: "Email" }).fill("test@gmail.com");
  await expect
    .soft(page.getByRole("textbox", { name: "Name" }))
    .toHaveValue("test");
  await expect
    .soft(page.getByRole("textbox", { name: "Email" }))
    .toHaveValue("test@gmail.com");
  await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect
    .soft(page.locator("#app"))
    .toContainText(
      "Thanks for your purchase. Please check your email for payment.",
    );
});
