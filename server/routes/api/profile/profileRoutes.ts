import { Router, Request, Response } from "express";
import { validationResult, param } from "express-validator";
import { BABYSITTER_INVALID_INPUT_ERROR, 
    PARENT_INVALID_INPUT_ERROR, reqUserValidation } from "../../../utils/global/globals"

import Handler from "./profileHandler";

const profileRouter = Router();

const handler = new Handler();


profileRouter.get("/babysitter/:id",
    [ 
        param('id').notEmpty().isNumeric().withMessage(BABYSITTER_INVALID_INPUT_ERROR)
    ],
    async (req: Request, res: Response) => {
        try {
            const { id: babysitterId } = req.params;
            const isValid =  await handler.babysitterValidation(req, Number(babysitterId));
            if (!isValid.valid) {
                return res
                .status(400)
                .json({ message:  isValid.message});
            }

            return res.status(200).send(isValid.profile);
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
            const { id: parentId } = req.params
            const isValid =  await handler.parentValidation(req, Number(parentId));
            if (!isValid.valid) {
                return res
                .status(400)
                .json({ message:  isValid.message});
            }

            return res.status(200).send(isValid.profile);
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
        try {
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
                return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }

            const { id: babysitterId } = req.params
            const babysitterProfile = await handler.getBabysitterProfile(Number(babysitterId));
            
            const validation = reqUserValidation(req, babysitterProfile)
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.message })
            }

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
        try {
            const fieldValidationResult = validationResult(req);
            if (!fieldValidationResult.isEmpty()) {
                return res
                .status(400)
                .json({ message: fieldValidationResult.array().map((item) => item.msg).join(' ') });
            }

            const { id: parentId } = req.params
            const parentProfile = await handler.getParentProfile(Number(parentId));
            
            const validation = reqUserValidation(req, parentProfile)
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.message })
            }

            const { 
                parent_name, 
                email, 
                city, 
                street, 
                gender, 
                phone_number, 
                min_kid_age, 
                max_kid_age, 
                num_of_kids,
                comments 
            } = req.body;

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

            if (min_kid_age !== undefined) {
                updates.push(`min_kid_age = $${paramIndex++}`);
                params.push(min_kid_age);
            }

            if (max_kid_age !== undefined) {
                updates.push(`max_kid_age = $${paramIndex++}`);
                params.push(max_kid_age);
            }

            if (num_of_kids !== undefined) {
                updates.push(`num_of_kids = $${paramIndex++}`);
                params.push(num_of_kids);
            }

            if (comments !== undefined) {
                updates.push(`comments = $${paramIndex++}`);
                params.push(comments);
            }

            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }

            await handler.updateParentProfile(Number(parentId), updates, params)
            return res.status(200).json({ message: `Profile updated successfully.`});
        } catch (e) {
            console.log(`Error message: ${req.body.id}: ${(e as Error).message}\n${(e as Error).stack}`);
            return res.status(500).end();
        }
    })

export default profileRouter;
