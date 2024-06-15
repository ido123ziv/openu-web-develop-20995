import { Router, Request, Response } from "express";
import { validationResult, param, body } from "express-validator";

import {
  BABYSITTER_INVALID_INPUT_ERROR,
  PARENT_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";

import Handler from "./profileHandler";

const profileRouter = Router();

const handler = new Handler();

profileRouter.get(
  "/babysitter/:id",
  [
    param("id")
      .notEmpty()
      .isNumeric()
      .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const { id: babysitterId } = req.params;

      const babysitterValidation = await handler.babysitterValidation(
        Number(babysitterId)
      );
      if (!babysitterValidation.isValid) {
        return res.status(400).json({ message: babysitterValidation.message });
      }

      const babysitterProfile = await handler.getBabysitterProfile(
        Number(babysitterId)
      );

      return res.status(200).send(babysitterProfile);
    } catch (e) {
      console.log(
        `Error message: ${req.body.id}: ${(e as Error).message}\n${
          (e as Error).stack
        }`
      );
      return res.status(500).end();
    }
  }
);

profileRouter.get(
  "/parent/:id",
  [param("id").notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const { id: parentId } = req.params;

      const parentValidation = await handler.parentValidation(Number(parentId));
      if (!parentValidation.isValid) {
        return res.status(400).json({ message: parentValidation.message });
      }

      const parentProfile = await handler.getParentProfile(Number(parentId));

      return res.status(200).send(parentProfile);
    } catch (e) {
      console.log(
        `Error message: ${req.body.id}: ${(e as Error).message}\n${
          (e as Error).stack
        }`
      );
      return res.status(500).end();
    }
  }
);

profileRouter.put(
  "/babysitter/update/:id",
  [
    param("id").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR),
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("email").isEmail().notEmpty().withMessage("Invalid email"),
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const { id: babysitterId } = req.params;

      const {
        name: babysitterName,
        email,
        city,
        street,
        experience,
        age,
        phoneNumber,
        gender,
        comments,
      } = req.body;

      const babysitterValidation = await handler.babysitterUpdateValidation(
        Number(babysitterId),
        {
          babysitterName,
          email,
          city,
          street,
          experience,
          age,
          phoneNumber,
          gender,
          comments,
        }
      );

      if (!babysitterValidation.isValid) {
        return res.status(400).json({ message: babysitterValidation.message });
      }

      await handler.updateBabysitterProfile(Number(babysitterId), {
        babysitterName,
        email,
        city,
        street,
        experience,
        age,
        phoneNumber,
        gender,
        comments,
      });

      return res.status(200).json({ message: `Profile updated successfully.` });
    } catch (e) {
      console.log(
        `Error message: ${req.body.id}: ${(e as Error).message}\n${
          (e as Error).stack
        }`
      );
      return res.status(500).end();
    }
  }
);

profileRouter.put(
  "/parent/update/:id",
  [
    param("id").notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR),
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("email").isEmail().notEmpty().withMessage("Invalid email"),
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const { id: parentId } = req.params;
      const {
        name: parentName,
        email,
        city,
        street,
        gender,
        phoneNumber,
        minKidAge,
        maxKidAge,
        numOfKids,
        comments,
      } = req.body;

      const parentValidation = await handler.parentUpdateValidation(
        Number(parentId),
        {
          parentName,
          email,
          city,
          street,
          gender,
          phoneNumber,
          minKidAge,
          maxKidAge,
          numOfKids,
          comments,
        }
      );

      if (!parentValidation.isValid) {
        return res.status(400).json({ message: parentValidation.message });
      }

      await handler.updateParentProfile(Number(parentId), {
        parentName,
        email,
        city,
        street,
        gender,
        phoneNumber,
        minKidAge,
        maxKidAge,
        numOfKids,
        comments,
      });

      return res.status(200).json({ message: `Profile updated successfully.` });
    } catch (e) {
      console.log(
        `Error message: ${req.body.id}: ${(e as Error).message}\n${
          (e as Error).stack
        }`
      );
      return res.status(500).end();
    }
  }
);

export default profileRouter;
