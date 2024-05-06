import { Router, request, response } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

recommendationsRouter.get("/", handler.getPreview);
recommendationsRouter.get("/babysitter/:babysitter", handler.getBabysitter);
recommendationsRouter.get("/parent/:parent", handler.getParent);
recommendationsRouter.get("/parent/:parent/babysitter/:babysitter", handler.getBabySitterParent);
recommendationsRouter.get("/babysitter/:babysitter/parent/:parent", handler.getBabySitterParent);
export default recommendationsRouter;