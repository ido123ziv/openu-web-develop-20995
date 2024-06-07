import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import Handler from "./contactHandler";

const contactRouter = Router();

const handler = new Handler();

contactRouter.post("/", 
  handler.fieldValidation(), 
  async (req: Request, res: Response) => {
    try {
      const fieldValidationResult = validationResult(req);
      if (!fieldValidationResult.isEmpty()) {
        return res
          .status(400)
          .json({ message: fieldValidationResult.array()[0].msg });
      }

      const {
        name,
        email,
        title,
        message
      } = req.body;

      const validation = await handler.contactValidation(email);

      if (!validation.isValid) {
        return res.status(400).send({ error: validation.message });
      }

      await handler.contact({
        name,
        email,
        title,
        message
      });

      return res.status(200).json({ message: "Message sent successfully" }).end();
    } catch (e) {
      console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
      return res.status(500).end();
    }
  }
);

export default contactRouter;