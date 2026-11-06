import { test, expect } from "@playwright/test";

// Verifies the full checkout flow: fill the form, submit, and see the success message.
test("ability to checkout - the success message should appear", async ({
  page,
}) => {
  await page.goto("https://coffee-cart.app/");
  // Add a Flat White and open the checkout form.
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="checkout"]').click();
  // Fill in name and email.
  await page.getByRole("textbox", { name: "Name" }).fill("test");
  await page.getByRole("textbox", { name: "Email" }).fill("test@gmail.com");
  // Confirm the entered values were kept in the fields.
  await expect
    .soft(page.getByRole("textbox", { name: "Name" }))
    .toHaveValue("test");
  await expect
    .soft(page.getByRole("textbox", { name: "Email" }))
    .toHaveValue("test@gmail.com");
  // Opt in to promotions and submit the order.
  await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
  await page.getByRole("button", { name: "Submit" }).click();
  // Check the post-purchase confirmation message.
  await expect
    .soft(page.locator("#app"))
    .toContainText(
      "Thanks for your purchase. Please check your email for payment.",
    );
});
