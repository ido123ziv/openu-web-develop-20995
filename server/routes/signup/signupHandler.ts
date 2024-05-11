import { body } from "express-validator";
import * as EmailValidator from "email-validator";
import { hash } from "bcrypt";

import DBHandler from "./signupDBHandler";
import { BabysitterSignup, ParentSignup, Validation } from "./signupTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  parentsFieldValidation = () => {
    return [
      body("name").isString().notEmpty().withMessage("Name must be a string"),
      body("email").isEmail().notEmpty().withMessage("Email must be a string"),
      body("password")
        .isString()
        .notEmpty()
        .withMessage("Password must be a string"),
      body("city").isString().notEmpty().withMessage("City must be a string"),
      body("street")
        .isString()
        .notEmpty()
        .withMessage("Street must be a string"),
      body("phoneNumber")
        .isString()
        .not()
        .notEmpty()
        .withMessage("Phone number must be a string"),
      body("gender")
        .isString()
        .notEmpty()
        .withMessage("Gender must be a string"),
      body("minKidAge")
        .isNumeric()
        .notEmpty()
        .withMessage("Min kid age must be a number"),
      body("maxKidAge")
        .isNumeric()
        .notEmpty()
        .withMessage("Max kid age must be a number"),
      body("numOfKids")
        .isNumeric()
        .notEmpty()
        .withMessage("Num of kids must be a number"),
      body("comments")
        .optional()
        .isString()
        .withMessage("comments must be a string"),
    ];
  };

  babysitterFieldValidation = () => {
    return [
      body("name").isString().notEmpty().withMessage("Name must be a string"),
      body("email").isEmail().notEmpty().withMessage("Email must be a string"),
      body("password")
        .isString()
        .notEmpty()
        .withMessage("Password must be a string"),
      body("city").isString().notEmpty().withMessage("City must be a string"),
      body("street")
        .isString()
        .notEmpty()
        .withMessage("Street must be a string"),
      body("experience")
        .isString()
        .notEmpty()
        .withMessage("Experience must be a string"),
      body("age").isNumeric().notEmpty().withMessage("Age must be a number"),
      body("phoneNumber")
        .isString()
        .notEmpty()
        .withMessage("Phone number must be a string"),
      body("gender")
        .isString()
        .notEmpty()
        .withMessage("Gender must be a string"),
      body("comments")
        .optional()
        .isString()
        .withMessage("comments must be a string"),
    ];
  };

  signupValidation = async (
    email: string,
    password: string
  ): Promise<Validation> => {
    const minPasswordLength = 4;

    if (password.length < minPasswordLength) {
      return { isValid: false, message: "Password is too short" };
    }

    if (!EmailValidator.validate(email)) {
      return { isValid: false, message: "Email isn't valid" };
    }

    try {
      const existingParent = await this.dbHandler.existingParent(email);

      if (existingParent) {
        return { isValid: false, message: "Email is already in use" };
      }
    } catch (error) {
      console.log(error);
    }

    return { isValid: true };
  };

  signupParent = async (data: ParentSignup) => {
    try {
      const hashedPassword = await hash(data.password, 12);

      await this.dbHandler.signUpParent({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        city: data.city,
        street: data.street,
        phoneNumber: data.phoneNumber,
        gender: data.gender.charAt(0).toUpperCase(),
        minKidAge: data.minKidAge,
        maxKidAge: data.maxKidAge,
        numOfKids: data.numOfKids,
        comments: data.comments,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  signupBabysitter = async (data: BabysitterSignup) => {
    try {
      const hashedPassword = await hash(data.password, 12);

      await this.dbHandler.signUpBabysitter({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        city: data.city,
        street: data.street,
        experience: data.experience,
        age: data.age,
        phoneNumber: data.phoneNumber,
        gender: data.gender.charAt(0).toUpperCase(),
        comments: data.comments,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
