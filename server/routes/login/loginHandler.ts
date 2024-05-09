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

  getDBHandler() {
    return this.dbHandler;
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

  loginUser = async (data: LoginData): Promise<UserDetails | null> => {
    const { email, password } = data;

    try {
      const user = await this.dbHandler.login(email);

      if (!user) {
        return null;
      }

      const matchingPassword = await compare(password, user.password);
      if (!matchingPassword) {
        return null;
      }

      return { id: user.id, name: user.name, role: user.role };
    } catch (error) {
      throw error;
    }
  };
}
