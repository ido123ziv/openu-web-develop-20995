import { Router, Request, Response } from "express";

import Handler from "./recommendationsHandler";

const recommendationsRouter = Router();

const handler = new Handler();

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
    // [ // todo: valdiate
    //     query('babysitterId').isNumeric().exists().withMessage('babysitterId must be provided and a number')
    // ],
    async (req: Request, res: Response) => {
        try {
            const { babysitterId } = req.params;

            if (!babysitterId){
                return res.status(400).send('babysitter_id must be provided and a number');
            }

            const babysitterRecommendations = await handler.getBabysitter(Number(babysitterId));

            return res.status(200).send(babysitterRecommendations);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

recommendationsRouter.get("/parent/:parent",
    // [ // todo: valdiate
    //     query('parentId').isNumeric().exists().withMessage('parentId must be provided and a number')
    // ],
    async (req: Request, res: Response) => {
        try {
            const { parentId } = req.params

            if (!parentId){
                return res.status(400).send('parent_id must be provided and a number');
            }

            const parentRecommendations = await handler.getParent(Number(parentId));

            return res.status(200).send(parentRecommendations);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

recommendationsRouter.get("/parent/:parent/babysitter/:babysitter",
    // [ // todo: valdiate
    //     query('parentId').isNumeric().exists().withMessage('parentId must be provided and a number'),
    //     query('babysitterId').isNumeric().exists().withMessage('babysitterId must be provided and a number')
    // ],
    async (req: Request, res: Response) => {
        try {
            const { parentId, babysitterId } = req.params;

            if (!parentId){
                return res.status(400).send('parent_id must be provided and a number');
            }

            if (!babysitterId){
                return res.status(400).send('babysitter_id must be provided and a number');
            }

            const babysitterAndParentRecommendations = await handler.getRecommendationByBabysitterAndParent(Number(parentId), Number(babysitterId));

            return res.status(200).send(babysitterAndParentRecommendations);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default recommendationsRouter;