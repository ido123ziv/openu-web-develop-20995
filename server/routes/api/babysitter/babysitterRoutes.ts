import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";

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

export default babysitterRouter;
