import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import * as EmailValidator from "email-validator";

import DBHandler from "./loginDBHandler";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  loginValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password || !EmailValidator.validate(email)) {
      res.status(401).json({ message: "Incorrect email or password" });
    } else {
      next();
    }
  }

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const data = await this.dbHandler.login(email);

      if (!data) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      const matchingPassword = await compare(password, data.password);
      if (!matchingPassword) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      res.status(200).json({ message: "Logged in successfully", data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed Login" });
    }
  };
}
