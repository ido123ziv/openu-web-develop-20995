import { Express } from "express";
import cors from "cors";

const securitySetup = (app: Express) => {
  app.use(cors());
};

export default securitySetup;
