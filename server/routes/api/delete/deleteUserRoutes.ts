import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";

import Handler from "./deleteUserHandler";

const deleteRouter = Router();

const handler = new Handler();
const BABYSITTER_INVALID_INPUT_ERROR = "babysitterId must be provided and a number";
const PARENT_INVALID_INPUT_ERROR = "parentId must be provided and a number";
const ACTIVE_END_TIMESTAMP = '9999999999';

deleteRouter.put("/parent/:parent", 
    [ 
        param('parent').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { parent: parentId } = req.params
            const data = await handler.getParent(Number(parentId));
            const userEndTimestamp = data[0]['end_timestamp']

            if (userEndTimestamp != ACTIVE_END_TIMESTAMP) {
                return res
                .status(400)
                .json({ message: 'This user is not active' });
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
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { babysitter: babysitterId } = req.params
            const data = await handler.getBabysitter(Number(babysitterId));
            const userEndTimestamp = data[0]['end_timestamp']

            if (userEndTimestamp != ACTIVE_END_TIMESTAMP) {
                return res
                .status(400)
                .json({ message: 'This user is not active' });
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