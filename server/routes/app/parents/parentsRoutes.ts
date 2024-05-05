import { Router } from "express";

import Handler from "./parentsHandler";

const parentsRouter = Router();

const handler = new Handler();

parentsRouter.post("/app/parents", handler.babysitters);

export default parentsRouter;