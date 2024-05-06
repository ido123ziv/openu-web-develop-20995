import { Router, request, response } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

recommendationsRouter.get("/", handler.getPreview);
recommendationsRouter.get("/:babysitter", handler.getBabysitter);
recommendationsRouter.get("/:parent", handler.getParent);
recommendationsRouter.get("/:parent/:babysitter", handler.getBabySitterParent);
export default recommendationsRouter;