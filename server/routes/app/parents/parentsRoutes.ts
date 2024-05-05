import { Router } from "express";

import Handler from "./parentsHandler";

const parentsRouter = Router();

const handler = new Handler();

parentsRouter.get("/", handler.getAllBabysitters);

export default parentsRouter;