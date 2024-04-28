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

  validateSomething(data: { id: number; name: string }): {
    isValid: boolean;
    message?: string;
  } {
    if (!data.id) {
      return { isValid: false, message: "Id is missing" };
    }

    if (!data.name) {
      return { isValid: false, message: "Name is missing" };
    }

    return { isValid: true };
  }

  loginUser = async (req: Request, res: Response) => {
    console.log(this.dbHandler);
    console.log("in login handelr", req.body);
    const { email, password } = req.body;

    try {
      const data = this.dbHandler.login(email, password);
      console.log(data);
      res.status(200).json({ message: "Logged in successfully", data });
    } catch (error) {
      console.log(error);
    }
  };

  //   async getUsers(): Promise<string[]> {
  //     return this.dbHandler.getUsers();
  //   }
}
