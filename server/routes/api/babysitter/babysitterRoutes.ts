import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";

import Handler from "./babysitterHandler";

const babysitterRouter = Router();

const handler = new Handler();

babysitterRouter.get(
  "/interactions/:id",
  [param("id").notEmpty().isNumeric().withMessage("Invalid Input")],
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

export default babysitterRouter;
