import { Router, Request, Response } from "express";

import Handler from "./moderatorHandler";

const moderatorRouter = Router();

const handler = new Handler();

moderatorRouter.get("/allUsers", async (req: Request, res: Response) => {
  try {
    const users = await handler.getAllUsers();

    return res.status(200).send(users);
  } catch (e) {
    console.log(
      `Error message: ${(e as Error).message}\n${(e as Error).stack}`
    );
    return res.status(500).end();
  }
});

export default moderatorRouter;
