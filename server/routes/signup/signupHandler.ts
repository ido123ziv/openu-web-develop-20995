import { Request, Response } from "express";
import DBHandler from "./signupDBHandler";
import { hash } from "bcrypt";
import { ParentSignup } from "./signupTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  signupValidation = (
    data: ParentSignup
  ): {
    isValid: boolean;
    message?: string;
  } => {
    // if (!data.email || !data.password) {
    //   return { isValid: false, message: "Incorrect email or password" };
    // }

    // TODO: bcrypt
    // if (!data.name) {
    //   return { isValid: false, message: "Incorrect email or password" };    }

    return { isValid: true };
  };

  signupParent = async (req: Request, res: Response) => {
    // TODO: Destructure req.body properly
    // const {
    //   name,
    //   email,
    //   city,
    //   street,
    //   gender,
    //   phoneNumber,
    //   minKidAge,
    //   maxKidAge,
    //   numOfKids,
    //   comments,
    // } = req.body; //TODO: add password

    console.log("pre try-catch", req.body);

    //TODO: hash password and convert to array called data
    // const hashedPassword = await hash(password, 12);

    try {
      const data = await this.dbHandler.signUpParent(req.body);
      console.log(data);
      res.status(200).json({ message: "Signed up successfully" });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Failed sign up" });
    }
  };

  signupBabysitter = async (req: Request, res: Response) => {
    // TODO: Destructure req.body properly
    // const { email, password } = req.body;

    //TODO: hash password and convert to array called data
    // const hashedPassword = await hash(password, 12);

    try {
      //   const data = await this.dbHandler.signUpBabySitter(req.body);
      //   console.log(data);
      //   res.status(200).json({ message: "Signed up successfully", data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed sign up" });
    }
  };
}
