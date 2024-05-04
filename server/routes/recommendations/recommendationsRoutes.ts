import { Router, request, response } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

recommendationsRouter.get("/", (request, response) => {
    console.log("recommendation request")
    response.send("WIP")
});

export default recommendationsRouter;