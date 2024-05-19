import { Router, Request, Response } from "express";
import { param } from "express-validator";

import Handler from "./deleteUserHandler";
import { BABYSITTER_INVALID_INPUT_ERROR, 
         PARENT_INVALID_INPUT_ERROR } from "../../../utils/global/globals"

const deleteRouter = Router();

const handler = new Handler();


deleteRouter.put("/parent/:id", 
    [ 
        param('id').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const { id: parentId } = req.params
            const isValid =  await handler.parentValidation(req, Number(parentId));
            if (!isValid.valid) {
                return res
                .status(400)
                .json({ message:  isValid.message});
            }
            
            await handler.deleteParent(Number(parentId));
            return res.status(200).json({ message: `User Deleted.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    }
)

deleteRouter.put("/babysitter/:id", 
    [ 
        param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const { id: babysitterId } = req.params
            const isValid =  await handler.babysitterValidation(req, Number(babysitterId));
            if (!isValid.valid) {
                return res
                .status(400)
                .json({ message:  isValid.message});
            }

            await handler.deleteBabysitter(Number(babysitterId));
            return res.status(200).json({ message: `User Deleted.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    }
)

export default deleteRouter;