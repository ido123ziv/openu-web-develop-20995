import { Router } from "express";

import Handler from "./loginHandler";

const loginRouter = Router();

const handler = new Handler();

loginRouter.post("/", handler.loginUser);

export default loginRouter;
