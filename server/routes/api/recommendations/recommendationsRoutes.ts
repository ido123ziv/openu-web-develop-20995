import { Router, request, response } from "express";
import Handler from "./recommendationsHandler";
const recommendationsRouter = Router();

const handler = new Handler();

recommendationsRouter.get("/", (request, response) => {
    console.log("get recommendations preview request")
    response.send("WIP")
});
recommendationsRouter.get("/:babysitter", (request, response) => {
    console.log("get all " + request.params.babysitter  +  "'s received recommendation request")
    response.send("WIP babysitter")
});
recommendationsRouter.get("/:parent", (request, response) => {
    console.log("get all  " + request.params.parent  +  "'s given recommendation request")
    response.send("WIP parent")
});
recommendationsRouter.get("/:parent/:babysitter", (request, response) => {
    console.log("get recommendations by " + request.params.parent + " for: " + request.params.babysitter)
    response.send("WIP babysitter parent")
});
export default recommendationsRouter;