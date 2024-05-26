import { body } from "express-validator";
import * as EmailValidator from "email-validator";

import DBHandler from "./contactDBHandler";
import { UserContact, Validation } from "./contactTypes";

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
    body("name").isString().notEmpty().withMessage("Name must be a not empty string"),
    body("email").isEmail().notEmpty().withMessage("Email must be a not empty string"),
    body("title").isString().notEmpty().withMessage("Title must be a not empty string"),
    body("message").isString().notEmpty().withMessage("Message must be a not empty string"),
    ];
  };

  contactValidation = async (email: string): Promise<Validation> => {
    if (!EmailValidator.validate(email)) {
      return { isValid: false, message: "Email isn't valid" };
    }

    return { isValid: true };
  };

  contact = async (data: UserContact) => {
    await this.dbHandler.contact({
      name: data.name,
      email: data.email,
      title: data.title,
      message: data.message
    });
  };
}