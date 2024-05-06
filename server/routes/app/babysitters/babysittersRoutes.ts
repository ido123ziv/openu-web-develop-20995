import { Router } from "express";

import Handler from "./babysittersHandler";

const babysittersRouter = Router();

const handler = new Handler();

babysittersRouter.post("/:id", handler.getUserByEmail, handler.deleteUser);

export default babysittersRouter;