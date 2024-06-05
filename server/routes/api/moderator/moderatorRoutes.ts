import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";

import Handler from "./moderatorHandler";
import { REQUEST_INVALID_INPUT_ERROR } from "../../../utils/global/globals";

const moderatorRouter = Router();

const handler = new Handler();

moderatorRouter.get("/allUsers", async (req: Request, res: Response) => {
  try {
    const users = await handler.getAllUsers();

    return res.status(200).send(users);
  } catch (e) {
    console.log(
      `Error message: ${(e as Error).message}\n${(e as Error).stack}`
    );
    return res.status(500).end();
  }
});

moderatorRouter.get(
  "/allContactRequests",
  async (req: Request, res: Response) => {
    try {
      const contactRequests = await handler.getContactRequests();

      return res.status(200).send(contactRequests);
    } catch (e) {
      console.log(
        `Error message: ${(e as Error).message}\n${(e as Error).stack}`
      );
      return res.status(500).end();
    }
  }
);

moderatorRouter.put(
  "/editContactRequestStatus/:id",
  [param("id").notEmpty().isNumeric().withMessage(REQUEST_INVALID_INPUT_ERROR)],
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const { id: requestId } = req.params;
      const { status: newStatus } = req.body;

      const requestValidation = await handler.requestValidation(
        Number(requestId),
        newStatus
      );
      if (!requestValidation.isValid) {
        return res.status(400).json({ message: requestValidation.message });
      }

      await handler.editContactRequestStatus(Number(requestId), newStatus);
      return res.status(200).json({ message: `Status Changed.` });
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

export default moderatorRouter;
