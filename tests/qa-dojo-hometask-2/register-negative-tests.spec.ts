import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { invalidUserNames, invalidEmails, invalidPasswords } from "./testData";

test.describe("registering using existing credentials - the error should be shown", () => {
  const userEmail = process.env.USER_EMAIL!;
  const userName = process.env.USER_NAME!;
  const userPassword = faker.internet.password({ length: 6 });

  test.beforeEach(async ({ page }) => {
    await page.goto("/articles/register");
  });

  test.afterEach(async ({ page }) => {
    await expect
      .soft(page.getByTestId("error-messages").getByRole("paragraph"))
      .toContainText("body email або username вже зайняті");
    await expect.soft(page.getByTestId("nav-sign-up")).toBeVisible();
  });

  test("registering using existing email - the error should be shown", async ({
    page,
  }) => {
    await page.getByTestId("auth-username").fill(faker.person.fullName());
    await page.getByTestId("auth-email").fill(userEmail);
    await page.getByTestId("auth-password").fill(userPassword);
    await page.getByTestId("register-confirm-password").fill(userPassword);
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();
  });

  test("registering using existing name - the error should be shown", async ({
    page,
  }) => {
    await page.getByTestId("auth-username").fill(userName);
    await page.getByTestId("auth-email").fill(faker.internet.email());
    await page.getByTestId("auth-password").fill(userPassword);
    await page.getByTestId("register-confirm-password").fill(userPassword);
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();
  });
});

test.describe("required fields with invalid data - errors should be shown", () => {
  const userName = faker.person.firstName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 6 });

  test.beforeEach(async ({ page }) => {
    await page.goto("/articles/register");
  });

  for (const { id, description, data } of invalidUserNames) {
    test(`${id}.  ${description} - should be the error: username ім'я має містити щонайменше 3 символи`, async ({
      page,
    }) => {
      await page.getByTestId("auth-username").fill(data);
      await page.getByTestId("auth-email").fill(email);
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("register-confirm-password").fill(password);
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();

      await expect
        .soft(page.getByTestId("error-messages").getByText("username"))
        .toBeVisible();
      await expect
        .soft(page.getByTestId("error-messages").getByRole("paragraph"))
        .toContainText("username ім'я має містити щонайменше 3 символи");
    });
  }

  test("empty email - should be the error: некоректний email", async ({
    page,
  }) => {
    await page.getByTestId("auth-username").fill(userName);
    await page.getByTestId("auth-password").fill(password);
    await page.getByTestId("register-confirm-password").fill(password);
    await page.getByTestId("register-terms").check();
    await page.getByTestId("auth-submit").click();

    await expect(page.getByText("email некоректний email")).toBeVisible();
  });

  for (const {
    id,
    description,
    data,
    message: expectedMessage,
  } of invalidEmails) {
    test(`${id}. ${description} - the browser's validation message should be shown`, async ({
      page,
    }) => {
      await page.getByTestId("auth-username").fill(userName);

      await page.getByTestId("auth-email").fill(data);
      await page.getByTestId("auth-password").fill(password);
      await page.getByTestId("register-confirm-password").fill(password);
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();

      const email = page.getByTestId("auth-email");

      const actualMessage = await email.evaluate(
        (el: HTMLInputElement) => el.validationMessage,
      );
      expect(actualMessage).toContain(expectedMessage);
    });
  }

  for (const { id, description, data } of invalidPasswords) {
    test(`${id}.  ${description} - should be the error: password пароль має містити щонайменше 6 символів`, async ({
      page,
    }) => {
      await page.getByTestId("auth-username").fill(userName);
      await page.getByTestId("auth-email").fill(email);
      await page.getByTestId("auth-password").fill(data);
      await page.getByTestId("register-confirm-password").fill(data);
      await page.getByTestId("register-terms").check();
      await page.getByTestId("auth-submit").click();

      await expect
        .soft(page.getByTestId("error-messages").getByText("password"))
        .toBeVisible();
      await expect
        .soft(page.getByTestId("error-messages").getByRole("paragraph"))
        .toContainText("password пароль має містити щонайменше 6 символів");
    });
  }
});

test("unconfirmed password - the error should be shown: confirm password doesn't match", async ({
  page,
}) => {
  await page.goto("/articles/register");

  await page.getByTestId("auth-username").fill(faker.person.firstName());
  await page.getByTestId("auth-email").fill(faker.internet.email());
  await page.getByTestId("auth-password").fill("123456");
  await page.getByTestId("register-confirm-password").fill("1234567");
  await page.getByTestId("register-terms").check();
  await page.getByTestId("auth-submit").click();
  await expect(page.getByText("confirm password doesn't match")).toBeVisible();
});
