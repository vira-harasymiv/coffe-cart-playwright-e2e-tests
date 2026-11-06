export const invalidUserNames = [
  {
    id: 1,
    description: "user name as empty string",
    data: "",
  },

  {
    id: 2,
    description: "user name containing 1 character",
    data: "q",
  },

  {
    id: 3,
    description: "user name containing 2 characters",
    data: "ff",
  },
];

const emailCase = (
  id: number,
  description: string,
  data: string,
  buildMessage: (email: string) => string,
) => ({ id, description, data, message: buildMessage(data) });

export const invalidEmails = [
  emailCase(
    1,
    "email without @ sign",
    "test",
    (email) =>
      "Please include an '@' in the email address. " +
      "'" +
      email +
      "'" +
      " is missing an '@'.",
  ),

  emailCase(
    2,
    "missing email domain",
    "user@",
    (email) =>
      "Please enter a part following '@'. " +
      "'" +
      email +
      "'" +
      " is incomplete.",
  ),

  emailCase(
    3,
    "email without local part",
    "@example.com",
    (email) =>
      "Please enter a part followed by '@'. " +
      "'" +
      email +
      "'" +
      " is incomplete.",
  ),
];

export const invalidPasswords = [
  {
    id: 1,
    description: "password as empty string",
    data: "",
  },

  {
    id: 2,
    description: "password containing 1 character",
    data: "q",
  },

  {
    id: 3,
    description: "password containing 5 characters",
    data: "fffff",
  },
];
