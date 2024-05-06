import { Router, request, response } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

export default recommendationsRouter;