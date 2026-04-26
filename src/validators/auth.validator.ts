import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "./common.validator";

export const registerValidator = [
  nameValidation(),
  emailValidation(),
  passwordValidation(),
];

export const loginValidator = [
  emailValidation(),
  passwordValidation(),
];

export const changePasswordValidator = [
  passwordValidation("oldPassword", "Old password"),
  passwordValidation("newPassword", "New password"),
];