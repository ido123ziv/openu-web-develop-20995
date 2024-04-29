import { Router } from "express";

const signupRouter = Router();

// const handler = new Handler();

signupRouter.post("/parents", () => {
  console.log("In Parents");
});

signupRouter.post("/babysitter", () => {
  console.log("In Babysitter");
});

export default signupRouter;
