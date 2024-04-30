import { Router } from "express";
import Handler from "./signupHandler";

const signupRouter = Router();

const handler = new Handler();

signupRouter.post("/parents", handler.signupParent);

signupRouter.post("/babysitter", handler.signupBabysitter);

export default signupRouter;
