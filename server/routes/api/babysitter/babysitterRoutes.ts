import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";
import multer from "multer";

import {
  BABYSITTER_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";
import Handler from "./babysitterHandler";
import * as s3 from "../../../utils/aws/s3"

const babysitterRouter = Router();

const handler = new Handler();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

babysitterRouter.get(
  "/interactions/:id",
  [
    param("id").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res.status(400).json({
          message: fieldValidationResult
            .array()
            .map((item) => item.msg)
            .join(" "),
        });
      }

      const { id } = req.params;

      const validation = await handler.userValidation(Number(id));
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }
      const data = await handler.getInteractions(Number(id));

      return res.status(200).json({ data });
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

babysitterRouter.put(
  "/image/:babysitterId",
  [
    param("babysitterId").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
  ],
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res.status(400).json({
          message: fieldValidationResult
            .array()
            .map((item) => item.msg)
            .join(" "),
        });
      }
      const { babysitterId } = req.params;
      const validation = await handler.userValidation(Number(babysitterId));
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const imageName = `babysitter_${babysitterId}`;

      if (!req.file) {
        return res.status(400).json({ error: `Missing file input.` });
      }
      
      const response = await handler.putProfileImage(req.file, imageName, Number(babysitterId));
      if (response || response.length > 0)
        throw new Error(response);

      return res.status(200).json({ message: `Image profile uploaded.` });
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

babysitterRouter.get(
  "/image/:babysitterId",
  [
    param("babysitterId").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res.status(400).json({
          message: fieldValidationResult
            .array()
            .map((item) => item.msg)
            .join(" "),
        });
      }
      const { babysitterId } = req.params;
      const validation = await handler.userValidation(Number(babysitterId));
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const response = await handler.getProfileImage(Number(babysitterId));
      return res.status(response.responseCode).send(response.imageUrl);
      
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
babysitterRouter.delete(
  "/image/:babysitterId",
  [
    param("babysitterId").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
  ],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res.status(400).json({
          message: fieldValidationResult
            .array()
            .map((item) => item.msg)
            .join(" "),
        });
      }
      const { babysitterId } = req.params;
      const validation = await handler.userValidation(Number(babysitterId));
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }
      await handler.deleteProfileImage(Number(babysitterId));

      res.status(200).json({ "message": "Image deleted safely." });
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

export default babysitterRouter;