import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import Handler from "./signupHandler";

const signupRouter = Router();

const handler = new Handler();

signupRouter.post(
  "/parents",
  handler.parentsFieldValidation(),
  async (req: Request, res: Response) => {
    const fieldValidationResult = validationResult(req);
    if (!fieldValidationResult.isEmpty()) {
      console.log(fieldValidationResult.array()[0].msg);
      return res
        .status(400)
        .json({ message: fieldValidationResult.array()[0].msg });
    }

    const {
      name,
      email,
      password,
      city,
      street,
      phoneNumber,
      gender,
      minKidAge,
      maxKidAge,
      numOfKids,
      comments,
    } = req.body;

    try {
      const validation = await handler.signupValidation(email, password);

      if (!validation.isValid) {
        return res.status(400).send({ error: validation.message });
      }

      await handler.signupParent({
        name,
        email,
        password,
        city,
        street,
        phoneNumber,
        gender,
        minKidAge,
        maxKidAge,
        numOfKids,
        comments,
      });

      return res.status(200).json({ message: "Signed up successfully" }).end();
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      return res.status(500).send();
    }
  }
);

signupRouter.post(
  "/babysitters",
  handler.babysitterFieldValidation(),
  async (req: Request, res: Response) => {
    const fieldValidationResult = validationResult(req);
    if (!fieldValidationResult.isEmpty()) {
      return res
        .status(400)
        .json({ message: fieldValidationResult.array()[0].msg });
    }

    const {
      name,
      email,
      password,
      city,
      street,
      experience,
      age,
      phoneNumber,
      gender,
      comments,
    } = req.body;

    try {
      const validation = await handler.signupValidation(email, password);

      if (!validation.isValid) {
        return res.status(400).send({ error: validation.message });
      }

      await handler.signupBabysitter({
        name,
        email,
        password,
        city,
        street,
        experience,
        age,
        phoneNumber,
        gender,
        comments,
      });

      return res.status(200).json({ message: "Signed up successfully" }).end();
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      return res.status(500).send();
    }
  }
);

export default signupRouter;
