import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";

import Handler from "./deleteUserHandler";
import { END_TIMESTAMP, 
         BABYSITTER_INVALID_INPUT_ERROR, 
         PARENT_INVALID_INPUT_ERROR, reqUserValidation } from "../../../utils/global/globals"

const deleteRouter = Router();

const handler = new Handler();

deleteRouter.put("/parent/:parent", 
    [ 
        param('parent').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const { parent: parentId } = req.params
            const data = await handler.getParent(Number(parentId));
            const validation = reqUserValidation(req, data)
            if (!validation.isValid) {
                return res.status(400).send({ error: validation.message })
            }
            
            await handler.deleteParent(Number(parentId));
            return res.status(200).json({ message: `User Deleted.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    }
)

deleteRouter.put("/babysitter/:babysitter", 
    [ 
        param('babysitter').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const { babysitter: babysitterId } = req.params
            const data = await handler.getBabysitter(Number(babysitterId));
            const validation = reqUserValidation(req, data)
            if (!validation.isValid) {
                return res.status(400).send({ error: validation.message })
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