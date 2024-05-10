import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";

import Handler from "./loginHandler";

const loginRouter = Router();

const handler = new Handler();

loginRouter.post(
  "/",
  handler.fieldValidation(),
  async (req: Request, res: Response) => {
    const fieldValidationResult = validationResult(req);
    if (!fieldValidationResult.isEmpty()) {
      return res
        .status(400)
        .json({ message: fieldValidationResult.array()[0].msg });
    }

    const { email, password } = req.body;

    const validation = handler.loginValidation(email);

    if (!validation.isValid) {
      return res.status(400).send({ error: validation.message });
    }

    try {
      const userDetails = await handler.loginUser({ email, password });

      if (!userDetails) {
        return res.status(400).json({ message: "Incorrect email or password" });
      }

      res.status(200).json({ message: "Logged in successfully", userDetails });
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      return res.status(500).send();
    }
  }
);

export default loginRouter;
