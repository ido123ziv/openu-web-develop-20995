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
  "/:babysitterId",
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

      const numOfViews = await handler.numOfViews(Number(babysitterId));

      res.status(200).json({ numOfViews });
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
        return res.status(400).json({ error: `Wrong request file.` });
      }
      
      s3.putImage(req.file, imageName)
      await handler.putProfileImage(imageName, Number(babysitterId));

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

      const imageName = `babysitter_${babysitterId}`;
      const imageUrl = await s3.getImageUrl(imageName)

      res.status(200).json({ imageUrl });
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