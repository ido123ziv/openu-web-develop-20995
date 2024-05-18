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

profileRouter.put("/babysitter/update/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        const { 
            babysitter_name, 
            email, 
            city, 
            street, 
            experience, 
            age, 
            phone_number, 
            gender, 
            comments 
        } = req.body;

        try {
            // Build the SQL query dynamically based on provided fields
            const updates: string[] = [];
            const params: any[] = [];
            let paramIndex = 1;

            if (babysitter_name !== undefined) {
                updates.push(`babysitter_name = $${paramIndex++}`);
                params.push(babysitter_name);
            }

            if (email !== undefined) {
                updates.push(`email = $${paramIndex++}`);
                params.push(email);
            }

            if (city !== undefined) {
                updates.push(`city = $${paramIndex++}`);
                params.push(city);
            }

            if (street !== undefined) {
                updates.push(`street = $${paramIndex++}`);
                params.push(street);
            }

            if (experience !== undefined) {
                updates.push(`experience = $${paramIndex++}`);
                params.push(experience);
            }
            
            if (age !== undefined) {
                updates.push(`age = $${paramIndex++}`);
                params.push(age);
            }
            
            if (phone_number !== undefined) {
                updates.push(`phone_number = $${paramIndex++}`);
                params.push(phone_number);
            }
            
            if (gender !== undefined) {
                updates.push(`gender = $${paramIndex++}`);
                params.push(gender);
            }

            if (comments !== undefined) {
                updates.push(`comments = $${paramIndex++}`);
                params.push(comments);
            }

            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }
            const { id: babysitterId } = req.params
            await handler.updateBabysitterProfile(Number(babysitterId), updates, params)
            return res.status(200).json({ message: `Profile updated successfully.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

profileRouter.put("/parent/update/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(PARENT_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        const { 
            parent_name, 
            email, 
            city, 
            street, 
            gender, 
            phone_number, 
            minKidAge, 
            maxKidAge, 
            numOfKids, 
            comments 
        } = req.body;

        try {
            // Build the SQL query dynamically based on provided fields
            const updates: string[] = [];
            const params: any[] = [];
            let paramIndex = 1;

            if (parent_name !== undefined) {
                updates.push(`parent_name = $${paramIndex++}`);
                params.push(parent_name);
            }

            if (email !== undefined) {
                updates.push(`email = $${paramIndex++}`);
                params.push(email);
            }

            if (city !== undefined) {
                updates.push(`city = $${paramIndex++}`);
                params.push(city);
            }

            if (street !== undefined) {
                updates.push(`street = $${paramIndex++}`);
                params.push(street);
            }

            if (gender !== undefined) {
                updates.push(`gender = $${paramIndex++}`);
                params.push(gender);
            }

            if (phone_number !== undefined) {
                updates.push(`phone_number = $${paramIndex++}`);
                params.push(phone_number);
            }

            if (minKidAge !== undefined) {
                updates.push(`minKidAge = $${paramIndex++}`);
                params.push(minKidAge);
            }

            if (maxKidAge !== undefined) {
                updates.push(`maxKidAge = $${paramIndex++}`);
                params.push(maxKidAge);
            }

            if (numOfKids !== undefined) {
                updates.push(`numOfKids = $${paramIndex++}`);
                params.push(numOfKids);
            }

            if (comments !== undefined) {
                updates.push(`comments = $${paramIndex++}`);
                params.push(comments);
            }

            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }
            const { id: parentId } = req.params
            await handler.updateParentProfile(Number(parentId), updates, params)
            return res.status(200).json({ message: `Profile updated successfully.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default profileRouter;
