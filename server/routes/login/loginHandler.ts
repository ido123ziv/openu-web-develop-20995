import { compare } from "bcrypt";
import * as EmailValidator from "email-validator";
import { body } from "express-validator";

import DBHandler from "./loginDBHandler";
import { LoginData, UserDetails, Validation } from "./loginTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  fieldValidation = () => {
    return [
      body("email").isEmail().notEmpty().withMessage("Email must be a string"),
      body("password")
        .isString()
        .notEmpty()
        .withMessage("Password must be a string"),
    ];
  };

  loginValidation = (email: string): Validation => {
    if (!EmailValidator.validate(email)) {
      return { isValid: false, message: "Email isn't valid" };
    }

    return { isValid: true };
  };

  loginUser = async (data: LoginData): Promise<UserDetails | undefined> => {
    const { email, password } = data;

    const user = await this.dbHandler.login(email);

    if (!user) {
      return;
    }

    const matchingPassword = await compare(password, user.password);
    if (!matchingPassword) {
      return;
    }

    return { id: user.id, name: user.name, role: user.role };
  };
}
