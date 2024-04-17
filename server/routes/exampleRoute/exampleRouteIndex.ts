import {Router} from 'express';
// import {body} from 'express-validator'; // todo: need to import it
// import * as HttpStatusCode from 'http-status-codes'; // todo: need to import it

import Handler from './exampleRouteHandler';

const handler = new Handler();

const router = Router();

router.get("/", () => {
    console.log("in index route")
})

router.post("/", [
    body('id').isNumeric().withMessage('ID must be a number') // todo: here add the validation for the params format types
    ],
    async (req, res) => {
    try {
        const { id, name } = req.body;

        const validation = handler.validateSomething({id, name}); // call validation
        if (!validation.isValid) { // if not valid then return error code 400
            return res.status(HttpStatusCode.BAD_REQUEST).send({error: validation.message});
        }
        // else if there is not validation problem then call the handler function that handles what this route should do
        const users = await handler.getUsers();

        return res.status(HttpStatusCode.OK).send(users); // return the result

    } catch (e) {
        console.log(`Error message: ${req.body.id}: ${e.message}\n${e.stack}`); // log the error
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(); // return error code 500
    }
})

export default router