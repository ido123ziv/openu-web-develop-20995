import { Request } from "express";
import { validationResult } from "express-validator";

import DBHandler from "./profileDBHandler";
import { ParentProfile, BabysitterProfile } from "./profileTypes"; 


export default class Handler {
    private dbHandler: DBHandler;

    constructor() {
        this.dbHandler = new DBHandler();
    }

    parentValidation = async(req: Request, parentId: number) => {
        const fieldValidationResult = validationResult(req);
        if (!fieldValidationResult.isEmpty()) {
          return { valid: false, message: fieldValidationResult.array().map((item) => item.msg).join(' ') }
        } 
    
        const parentProfile = await this.dbHandler.getParentProfile(parentId);
        if (parentProfile.length === 0) {
          return { valid: false, message: 'Incorrect id' }
        }

        return { valid: true, profile: parentProfile }
    }
    
    babysitterValidation = async(req: Request, babysitterId: number) => {
        const fieldValidationResult = validationResult(req);
        if (!fieldValidationResult.isEmpty()) {
          return { valid: false, message: fieldValidationResult.array().map((item) => item.msg).join(' ') }
        } 
    
        const babysitterProfile = await this.dbHandler.getBabySitterProfile(babysitterId);
        if (babysitterProfile.length === 0) {
          return { valid: false, message: 'Incorrect id' }
        }

        return { valid: true, profile: babysitterProfile }
    }

    getBabysitterProfile = async (babysitterId: number): Promise<BabysitterProfile[]> => {
        return this.dbHandler.getBabySitterProfile(babysitterId);
    }

    getParentProfile = async (parentId: number): Promise<ParentProfile[]> => {
        return this.dbHandler.getParentProfile(parentId);
    }

    updateBabysitterProfile = async (babysitterId: number, fields: string[], params: any[]) => {
        this.dbHandler.updateBabySitterProfile(babysitterId, fields, params);
    }

    updateParentProfile = async (parentId: number, fields: string[], params: any[]) => {
        this.dbHandler.updateParentProfile(parentId, fields, params);
    }
}