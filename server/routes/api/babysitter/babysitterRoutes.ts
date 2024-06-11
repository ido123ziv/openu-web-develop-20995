import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";
import {getImage} from "../../../utils/aws/s3";
import {
  BABYSITTER_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";
import Handler from "./babysitterHandler";

const babysitterRouter = Router();

const handler = new Handler();

babysitterRouter.get(
  "/:babysitterId",
  [param("babysitterId").notEmpty().isNumeric().withMessage("Invalid Input")],
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

      const validation =await handler.userValidation(Number(babysitterId));
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
babysitterRouter.get(
  "/:babysitterId/image",
  [param("babysitterId").notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)],
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
      const validation =await handler.userValidation(Number(babysitterId));
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const imageUrl = await getImage(Number(babysitterId));
      res.status(200).send(imageUrl);
    }
    catch(e){
        const errorMessage = `Error message: ${req.body.id}: ${(e as Error).message}\n${
          (e as Error).stack
        }`;
        console.error(errorMessage);
        return res.status(500).end();
    }
  }

);


export default babysitterRouter;
