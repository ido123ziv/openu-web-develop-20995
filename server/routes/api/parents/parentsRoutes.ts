import { Router, Request, Response } from "express";
import { param } from "express-validator";

import Handler from "./parentsHandler";
import {
  BABYSITTER_INVALID_INPUT_ERROR,
  PARENT_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";

const parentsRouter = Router();

const handler = new Handler();

parentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allBabysitters = await handler.getAllBabysitters();

    return res.status(200).send(allBabysitters);
  } catch (e) {
    console.log(
      `Error message: ${req.body.id}: ${(e as Error).message}\n${
        (e as Error).stack
      }`
    );
    return res.status(500).end();
  }
});

parentsRouter.put(
  "/:parent/babysitter/:babysitter",
  param("parent")
    .notEmpty()
    .isNumeric()
    .withMessage(PARENT_INVALID_INPUT_ERROR),
  param("babysitter")
    .notEmpty()
    .isNumeric()
    .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
  async (req: Request, res: Response) => {
    try {
      const { parent, babysitter } = req.params;

      const parentId = Number(parent);
      const babysitterId = Number(babysitter);

      const validation = await handler.userValidation(parentId, babysitterId);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      await handler.handleInteraction(parentId, babysitterId);

      return res.status(204).end();
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

export default parentsRouter;
