import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";

import Handler from "./parentsHandler";
import {
  BABYSITTER_INVALID_INPUT_ERROR,
  PARENT_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";

const parentsRouter = Router();

const handler = new Handler();

parentsRouter.get("/allBabysitters/:parent", async (req: Request, res: Response) => {
  try {
      const { parent } = req.params;

    const allBabysitters = await handler.getAllBabysitters(Number(parent));

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

parentsRouter.get(
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
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res.status(400).json({
          message: fieldValidationResult
            .array()
            .map((item) => item.msg)
            .join(" "),
        });
      }

      const { parent, babysitter } = req.params;

      const parentId = Number(parent);
      const babysitterId = Number(babysitter);

      const userValidation = await handler.userValidation(
        parentId,
        babysitterId
      );

      if (!userValidation.isValid) {
        return res.status(400).json({ error: userValidation.message });
      }

      const interaction = await handler.getInteraction(parentId, babysitterId);

      res.status(200).json({ interaction });
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

parentsRouter.put(
  "/:parent/babysitter/:babysitter/contacted",
  param("parent")
    .notEmpty()
    .isNumeric()
    .withMessage(PARENT_INVALID_INPUT_ERROR),
  param("babysitter")
    .notEmpty()
    .isNumeric()
    .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
  async (req: Request, res: Response) => {
    const { parent, babysitter } = req.params;

    const parentId = Number(parent);
    const babysitterId = Number(babysitter);

    const validation = await handler.userValidation(parentId, babysitterId);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    await handler.updateContacted(parentId, babysitterId);

    res.status(204).end();
  }
);

parentsRouter.put(
  "/:parent/babysitter/:babysitter/workedwith",
  param("parent")
    .notEmpty()
    .isNumeric()
    .withMessage(PARENT_INVALID_INPUT_ERROR),
  param("babysitter")
    .notEmpty()
    .isNumeric()
    .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
  async (req: Request, res: Response) => {
    const { parent, babysitter } = req.params;

    const parentId = Number(parent);
    const babysitterId = Number(babysitter);

    const validation = await handler.userValidation(parentId, babysitterId);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    await handler.updateWorkedWith(parentId, babysitterId);

    res.status(204).end();
  }
);

export default parentsRouter;
