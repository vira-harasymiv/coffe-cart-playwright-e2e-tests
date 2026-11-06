import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("registration - should be successful", async ({ page }) => {
  const userName = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 6 });

  await page.goto("/articles/register");

  await page.getByTestId("auth-username").fill(userName);
  await page.getByTestId("auth-email").fill(email);
  await page.getByTestId("auth-password").fill(password);
  await page.getByTestId("register-confirm-password").fill(password);
  await page.getByText("Social media").check();
  await page.getByTestId("register-source-social").check();
  await page.getByTestId("register-terms").check();
  await page.getByTestId("auth-submit").click();

  await expect.soft(page.getByTestId("nav-profile")).toContainText(userName);

  await page.getByTestId("nav-profile").click();
  await expect
    .soft(page.getByTestId("profile-username"))
    .toContainText(userName);
});
