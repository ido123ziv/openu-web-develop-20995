import { Router, Request, Response } from "express";

import Handler from "./loginHandler";

const loginRouter = Router();

const handler = new Handler();

// TODO: Remove once done testing
loginRouter.post("/login", handler.loginUser);

export default loginRouter;
