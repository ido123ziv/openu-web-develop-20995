import { Router } from "express";

import Handler from "./moderatorHandler";

const moderatorRouter = Router();

const handler = new Handler();

moderatorRouter.get("/allUsers", handler.getAllUsers);

export default moderatorRouter;
