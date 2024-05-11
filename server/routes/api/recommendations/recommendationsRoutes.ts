import { Router, Request, Response } from "express";
import { validationResult, query, param } from "express-validator";

import Handler from "./recommendationsHandler";

const recommendationsRouter = Router();

const handler = new Handler();
const BABYSITTER_INVALID_INPUT_ERROR = "babysitterId must be provided and a number";
const PARENT_INVALID_INPUT_ERROR = "parentId must be provided and a number";

recommendationsRouter.get("/",
    async (req: Request, res: Response) => {
        try {
            const recommendationsPreview = await handler.getPreview();

            return res.status(200).send(recommendationsPreview);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

recommendationsRouter.get("/babysitter/:babysitter",
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
            const { babysitter: babysitterId } = req.params;
            const babysitterRecommendations = await handler.getBabysitter(Number(babysitterId));
            return res.status(200).send(babysitterRecommendations);

        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

recommendationsRouter.get("/parent/:parent",
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

            const parentRecommendations = await handler.getParent(Number(parentId));

            return res.status(200).send(parentRecommendations);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

recommendationsRouter.get("/parent/:parent/babysitter/:babysitter",
    [ 
        param('parent').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR),
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
            const { parent: parentId, babysitter: babysitterId } = req.params;

            const babysitterAndParentRecommendations = await handler.getRecommendationByBabysitterAndParent(Number(parentId), Number(babysitterId));

            return res.status(200).send(babysitterAndParentRecommendations);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default recommendationsRouter;
