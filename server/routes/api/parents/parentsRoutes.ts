import { Router, Request, Response } from "express";

import Handler from "./parentsHandler";

const parentsRouter = Router();

const handler = new Handler();

parentsRouter.get("/", 
    async (req: Request, res: Response) => {
        try {
            const allBabysitters = await handler.getAllBabysitters();

            return res.status(200).send(allBabysitters);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    }
)

export default parentsRouter;