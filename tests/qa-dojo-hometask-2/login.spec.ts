import { test, expect } from "@playwright/test";

test("login as an existing user - should be successful", async ({ page }) => {
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;
  const name = process.env.USER_NAME!;

  await page.goto("/login");

  await page.getByTestId("auth-email").fill(email);
  await page.getByTestId("auth-password").fill(password);
  await page.getByTestId("auth-submit").click();

  await expect.soft(page.getByTestId("nav-profile")).toContainText(name);

  await page.getByTestId("nav-profile").click();
  await expect.soft(page.getByTestId("profile-username")).toBeVisible();
  await expect.soft(page.getByTestId("profile-username")).toContainText(name);
});
