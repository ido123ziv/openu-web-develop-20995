import { Request, Response, NextFunction } from "express";

import DBHandler from "./babysittersDBHandler";

export default class Handler {
    private dbHandler: DBHandler;
  
    constructor() {
      this.dbHandler = new DBHandler();
    }
  
    getDBHandler() {
      return this.dbHandler;
    }

    getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
  
      if (!email) {
        res.status(401).json({ message: "Empty email" });
      } else {
        try {
          const user = await this.dbHandler.findByEmail(email);
          if (!user) {
            return res.status(404).json({message: "Cannot find user by this email"})
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error.message });
        }

        next();
      }
    };

    deleteUser = async (req: Request, res: Response) => {
      const { email } = req.body;

      try {
        const data = await this.dbHandler.deleteUser(email);
  
        if (!data) {
          return res.status(401).json({ message: "Incorrect email" });
        }
  
        res.status(200).json({ message: "Deleted User", data });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to delete" });
      }
    };
}