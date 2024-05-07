import { Router } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

recommendationsRouter.get("/", handler.getPreview);
recommendationsRouter.get("/babysitter/:babysitter", handler.getBabysitter);
recommendationsRouter.get("/parent/:parent", handler.getParent);
recommendationsRouter.get("/parent/:parent/babysitter/:babysitter", handler.getRecommendationByBabysitterAndParent);
export default recommendationsRouter;