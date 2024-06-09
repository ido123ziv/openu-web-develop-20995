import { Router, Request, Response } from "express";
import { param, validationResult } from "express-validator";

import Handler from "./babysitterHandler";

const babysitterRouter = Router();

const handler = new Handler();

// babysitterRouter.get(
//   "/:babysitterId",
//   [param("babysitterId").notEmpty().isNumeric().withMessage("Invalid Input")],
//   async (req: Request, res: Response) => {
//     try {
//       const fieldValidationResult = validationResult(req);
//       if (!fieldValidationResult.isEmpty()) {
//         return res.status(400).json({
//           message: fieldValidationResult
//             .array()
//             .map((item) => item.msg)
//             .join(" "),
//         });
//       }

//       const { babysitterId } = req.params;

//       const validation = await handler.userValidation(Number(babysitterId));
//       if (!validation.isValid) {
//         return res.status(400).json({ error: validation.message });
//       }

//       const numOfViews = await handler.numOfViews(Number(babysitterId));

//       res.status(200).json({ numOfViews });
//     } catch (e) {
//       console.log(
//         `Error message: ${req.body.id}: ${(e as Error).message}\n${
//           (e as Error).stack
//         }`
//       );
//       return res.status(500).end();
//     }
//   }
// );

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
