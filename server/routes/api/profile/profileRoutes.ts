import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";
import { BABYSITTER_INVALID_INPUT_ERROR, 
    PARENT_INVALID_INPUT_ERROR } from "../../../utils/global/globals"

import Handler from "./profileHandler";

const profileRouter = Router();

const handler = new Handler();


profileRouter.get("/babysitter/:id",
     [ 
         param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
     ],
    async (req: Request, res: Response) => {
        try {

            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { id: babysitterId } = req.params;
            const babysitterProfile = await handler.getBabysitterProfile(Number(babysitterId));
            return res.status(200).send(babysitterProfile);

        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

profileRouter.get("/parent/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
              return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }
            const { id: parentId } = req.params

            const parentProfile = await handler.getParentProfile(Number(parentId));

            return res.status(200).send(parentProfile);
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

profileRouter.get("/babysitter/update/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        const { 
            name, 
            email, 
            city, 
            street, 
            experience, 
            age, 
            phoneNumber, 
            gender, 
            comments 
        } = req.body;

        try {
            // Build the SQL query dynamically based on provided fields
            const updates: string[] = [];
            const params: any[] = [];

            if (name !== undefined) {
                updates.push('name = ?');
                params.push(name);
            }

            if (email !== undefined) {
                updates.push('email = ?');
                params.push(email);
            }

            if (city !== undefined) {
                updates.push('city = ?');
                params.push(city);
            }

            if (street !== undefined) {
                updates.push('street = ?');
                params.push(street);
            }

            if (experience !== undefined) {
                updates.push('experience = ?');
                params.push(experience);
            }
            
            if (age !== undefined) {
                updates.push('age = ?');
                params.push(age);
            }
            
            if (phoneNumber !== undefined) {
                updates.push('phoneNumber = ?');
                params.push(phoneNumber);
            }
            
            if (gender !== undefined) {
                updates.push('gender = ?');
                params.push(gender);
            }

            if (comments !== undefined) {
                updates.push('comments = ?');
                params.push(comments);
            }

            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }
            const { id: babysitterId } = req.params
            await handler.updateBabysitterProfile(Number(babysitterId), updates)
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

profileRouter.get("/parent/update/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        const { 
            name, 
            email, 
            city, 
            street, 
            gender, 
            phoneNumber, 
            minKidAge, 
            maxKidAge, 
            numOfKids, 
            comments 
        } = req.body;

        try {
            // Build the SQL query dynamically based on provided fields
            const updates: string[] = [];
            const params: any[] = [];

            if (name !== undefined) {
                updates.push('name = ?');
                params.push(name);
            }

            if (email !== undefined) {
                updates.push('email = ?');
                params.push(email);
            }

            if (city !== undefined) {
                updates.push('city = ?');
                params.push(city);
            }

            if (street !== undefined) {
                updates.push('street = ?');
                params.push(street);
            }

            if (gender !== undefined) {
                updates.push('gender = ?');
                params.push(gender);
            }

            if (phoneNumber !== undefined) {
                updates.push('phoneNumber = ?');
                params.push(phoneNumber);
            }

            if (minKidAge !== undefined) {
                updates.push('minKidAge = ?');
                params.push(minKidAge);
            }

            if (maxKidAge !== undefined) {
                updates.push('maxKidAge = ?');
                params.push(maxKidAge);
            }

            if (numOfKids !== undefined) {
                updates.push('numOfKids = ?');
                params.push(numOfKids);
            }

            if (comments !== undefined) {
                updates.push('comments = ?');
                params.push(comments);
            }

            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }
            const { id: parentId } = req.params
            await handler.updateParentProfile(Number(parentId), updates)
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default profileRouter;
