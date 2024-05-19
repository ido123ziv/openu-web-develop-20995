import { Request } from "express";
import { validationResult } from "express-validator";

export const END_TIMESTAMP = 9999999999;
export const BABYSITTER_INVALID_INPUT_ERROR = "babysitterId must be provided and a number";
export const PARENT_INVALID_INPUT_ERROR = "parentId must be provided and a number";


export function reqUserValidation(req: Request, data: any[]) {
    if (data.length === 0) {
        return { isValid: false, message: 'Incorrect id' }
    }

    const userEndTimestamp = data[0]['end_timestamp']
    if (userEndTimestamp != String(END_TIMESTAMP)) {
        return { isValid: false, message: 'This user is not active' }
    }

    return { isValid: true, message: 'Request data is valid' }
}
