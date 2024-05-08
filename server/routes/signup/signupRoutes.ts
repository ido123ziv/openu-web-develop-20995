import { Router, Request, Response } from "express";
import Handler from "./signupHandler";

const signupRouter = Router();

const handler = new Handler();

router.post("/parents",
    // [
    //     body('id').isNumeric().withMessage('ID must be a number') // todo: here add the validation for the params format types
    // ],
    ,
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body; // todo: add here more fields

            const validation = handler.signupValidation(email, password);
            if (!validation.isValid) {
                return res.status(400).send({error: validation.message});
            }

            await handler.signupParent({email, password});

            return res.status(200).end();
        } catch (e) {
            console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`); // todo: add parent name
            return res.status(500).send();
        }
    });


// signupRouter.post("/parents", handler.signupValidation, handler.signupParent);

signupRouter.post(
  "/babysitters",
  handler.signupValidation,
  handler.signupBabysitter
);

export default signupRouter;
