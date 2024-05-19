// import { Request } from "express";

// import { Parent, Babysitter } from "./globalTypes";

export const END_TIMESTAMP = 9999999999;
export const BABYSITTER_INVALID_INPUT_ERROR = "babysitterId must be provided and a number";
export const PARENT_INVALID_INPUT_ERROR = "parentId must be provided and a number";


// export function reqUserValidation(req: Request, data: Parent[] | Babysitter[]) {
//     if (data.length === 0) {
//         return { isValid: false, message: 'Incorrect id' }
//     }

//     return { isValid: true, message: 'Request data is valid' }
// }
