import { Request, Response } from "express";
import DBHandler from "./loginDBHandler";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  loginValidation(data: { email: string; password: string }): {
    isValid: boolean;
    message?: string;
  } {
    if (!data.email || !data.password) {
      return { isValid: false, message: "Incorrect email or password" };
    }

    // bcrypt
    // if (!data.name) {
    //   return { isValid: false, message: "Incorrect email or password" };    }

    return { isValid: true };
  }

  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const data = await this.dbHandler.login(email, password);
      console.log(data);
      res.status(200).json({ message: "Logged in successfully", data });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Failed Login" });
    }
  };
}
