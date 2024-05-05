import { NextFunction, Request, Response } from "express";

import DBHandler from "./parentsDBHandler";

export default class Handler {
    private dbHandler: DBHandler;
  
    constructor() {
      this.dbHandler = new DBHandler();
    }
  
    getDBHandler() {
      return this.dbHandler;
    }

    babysitters = async (req: Request, res: Response) => {
        try {
            const data = await this.dbHandler.allBabysitters();
            res.status(200).json({ message: "Successfully retrieved data", data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Failed to retrieve data" });

        }
    }
}