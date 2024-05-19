import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";
import { BABYSITTER_INVALID_INPUT_ERROR, 
    PARENT_INVALID_INPUT_ERROR } from "../../../utils/global/globals"

import Handler from "./profileHandler";

const profileRouter = Router();

const handler = new Handler();


profileRouter.get("/babysitter/:id",
     [ 
         param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
     ],
    async (req: Request, res: Response) => {
        try {

            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { id: babysitterId } = req.params;
            const babysitterProfile = await handler.getBabysitterProfile(Number(babysitterId));
            return res.status(200).send(babysitterProfile);

        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

profileRouter.get("/parent/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { id: parentId } = req.params

            const parentProfile = await handler.getParentProfile(Number(parentId));

            return res.status(200).send(parentProfile);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default profileRouter;
