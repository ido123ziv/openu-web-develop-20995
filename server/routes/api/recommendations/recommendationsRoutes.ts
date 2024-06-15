import { Router, Request, Response } from "express";
import { validationResult, param, body } from "express-validator";
import {
  BABYSITTER_INVALID_INPUT_ERROR,
  PARENT_INVALID_INPUT_ERROR,
} from "../../../utils/global/globals";
import Handler from "./recommendationsHandler";

const recommendationsRouter = Router();

const handler = new Handler();
recommendationsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const recommendationsPreview = await handler.getPreview();

    return res.status(200).send(recommendationsPreview);
  } catch (e) {
    console.log(
      `Error message: ${req.body.id}: ${(e as Error).message}\n${
        (e as Error).stack
      }`
    );
    return res.status(500).end();
  }
});

recommendationsRouter.get(
  "/babysitter/:babysitter",
  [
    param("babysitter")
      .notEmpty()
      .isNumeric()
      .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
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
      const { babysitter: babysitterId } = req.params;

      const validation = await handler.babysitterValidation(
        Number(babysitterId)
      );

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const babysitterRecommendations = await handler.getBabysitter(
        Number(babysitterId)
      );

      return res.status(200).send(babysitterRecommendations);
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
recommendationsRouter.get(
  "/babysitter/rating/:babysitter",
  [
    param("babysitter")
      .notEmpty()
      .isNumeric()
      .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
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
      const { babysitter: babysitterId } = req.params;
      const babysitterExists = await handler.validateBabysitter(
        Number(babysitterId)
      );
      if (!babysitterExists) {
        return res.status(404).send({ message: "babysitter doesn't exists" });
      }
      const babysitterRating = await handler.getBabysitterRating(
        Number(babysitterId)
      );
      return res.status(200).send(babysitterRating);
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

recommendationsRouter.get(
  "/parent/:parent",
  [
    param("parent")
      .notEmpty()
      .isNumeric()
      .withMessage(PARENT_INVALID_INPUT_ERROR),
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
      const { parent: parentId } = req.params;

      const validation = await handler.parentValidation(Number(parentId));

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const parentRecommendations = await handler.getParent(Number(parentId));

      return res.status(200).send(parentRecommendations);
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

recommendationsRouter.get(
  "/parent/:parent/babysitter/:babysitter",
  [
    param("parent")
      .notEmpty()
      .isNumeric()
      .withMessage(PARENT_INVALID_INPUT_ERROR),
    param("babysitter")
      .notEmpty()
      .isNumeric()
      .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
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
      const { parent: parentId, babysitter: babysitterId } = req.params;

      const validation = await handler.userValidation(
        Number(parentId),
        Number(babysitterId)
      );

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.message });
      }

      const babysitterAndParentRecommendations =
        await handler.getRecommendationByBabysitterAndParent(
          Number(parentId),
          Number(babysitterId)
        );

      return res.status(200).send(babysitterAndParentRecommendations);
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

recommendationsRouter.post(
  "/:babysitterId",
  [
    param("babysitterId")
      .notEmpty()
      .isNumeric()
      .withMessage(BABYSITTER_INVALID_INPUT_ERROR),
    body("parentId")
      .notEmpty()
      .isNumeric()
      .withMessage(PARENT_INVALID_INPUT_ERROR),
    body("rating")
      .notEmpty()
      .isNumeric()
      .withMessage("Invalid rating, must be a number"),
    body("recommendationText")
      .notEmpty()
      .isString()
      .withMessage("Invalid recommendation, must be a string"),
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

      const { parentId, rating, recommendationText } = req.body;

      const userValidation = await handler.userValidation(
        Number(parentId),
        Number(babysitterId)
      );

      const recommendationValidation = await handler.recommendationValidation(
        Number(parentId),
        Number(babysitterId)
      );

      if (!userValidation.isValid || !recommendationValidation.isValid) {
        return res.status(400).send({
          error: userValidation.message || recommendationValidation.message,
        });
      }

      await handler.postRecommendation({
        babysitterId: Number(babysitterId),
        parentId,
        rating,
        recommendationText,
      });

      return res.status(200).end();
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

export default recommendationsRouter;
