import { Router } from "express";
import Handler from "./signupHandler";

const signupRouter = Router();

const handler = new Handler();

signupRouter.post("/parents", handler.signupValidation, handler.signupParent);

signupRouter.post(
  "/babysitters",
  handler.signupValidation,
  handler.signupBabysitter
);

export default signupRouter;
