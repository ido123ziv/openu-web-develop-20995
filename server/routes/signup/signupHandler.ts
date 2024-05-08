import { NextFunction, Request, Response } from "express";
import * as EmailValidator from "email-validator";

import DBHandler from "./signupDBHandler";
import { hash } from "bcrypt";
import {ParentSignup} from "./signupTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  signupValidation(email:string, password: string ): { isValid: boolean; message?: string } {
    const minPasswordLength = 4;

    if (password.length < minPasswordLength) {
      return { isValid: false, message: "Password is too short" };
    }

    const existingParent = await this.dbHandler.existingParent(email);

    if (existingParent) {
      return { isValid: false, message: "Email is already in use" };
    }

    return { isValid: true };
  }

  //  signupValidation = (req: Request, res: Response, next: NextFunction) => {
  //   const minPasswordLength = 4;
  //   const { comments, ...inputs } = req.body;
  //
  //   const hasNullInput = Object.values(inputs).some(
  //     (value) => value === null || value === "" || value === 0
  //   );
  //
  //   if (
  //     hasNullInput ||
  //     !EmailValidator.validate(req.body.email) ||
  //     req.body.password.length < minPasswordLength
  //   ) {
  //     res
  //       .status(401)
  //       .json({ message: "Please fill out all the required fields" });
  //   } else {
  //     next();
  //   }
  // };


  async signupParent(data: ParentSignup): Promise<void> {
    try {
      const hashedPassword = await hash(data.password, 12);

      await this.dbHandler.signUpParent({
        data,
        password: hashedPassword,
      });

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  signupBabysitter = async (req: Request, res: Response) => {
    try {
      const existingBabysitter = await this.dbHandler.existingBabysitter(
        req.body.email
      );
      if (existingBabysitter) {
        return res.status(401).json({ message: "Email is already in use" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed sign up" });
    }

    const { password } = req.body;
    try {
      const hashedPassword = await hash(password, 12);
      await this.dbHandler.signUpBabysitter({
        ...req.body,
        password: hashedPassword,
      });

      res.status(200).json({ message: "Signed up successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed sign up" });
    }
  };
}
