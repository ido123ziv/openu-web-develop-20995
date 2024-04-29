import { Request, Response } from "express";
import DBHandler from "./signupDBHandler";
import { hash } from "bcrypt";

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

    // TODO: bcrypt
    // if (!data.name) {
    //   return { isValid: false, message: "Incorrect email or password" };    }

    return { isValid: true };
  }

  signupParent = async (req: Request, res: Response) => {
    // TODO: Destructure req.body properly
    const { email, password } = req.body;

    //TODO: hash password and convert to array called data
    // const hashedPassword = await hash(password, 12);

    try {
      const data = await this.dbHandler.login(email, password);
      console.log(data);
      res.status(200).json({ message: "Logged in successfully", data });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Failed Login" });
    }
  };

  signupBabysitter = async (req: Request, res: Response) => {
    // TODO: Destructure req.body properly
    const { email, password } = req.body;

    //TODO: hash password and convert to array called data
    // const hashedPassword = await hash(password, 12);

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
