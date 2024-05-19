import { validationResult } from "express-validator";
import { Request } from "express";

import DBHandler from "./deleteUserDBHandler";
import { UserDelete } from "./deleteUserTypes";
import { END_TIMESTAMP } from "../../../utils/global/globals";

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

    const parentProfile = await this.dbHandler.getParent(parentId);
    if (parentProfile.length === 0) {
      return { valid: false, message: 'Incorrect id' }
    }

    if (parentProfile[0].endTimestamp !== String(END_TIMESTAMP)) {
      return { valid: false, message: 'This user is not active' }
    }

    return { valid: true }
  }

  babysitterValidation = async(req: Request, babysitterId: number) => {
    const fieldValidationResult = validationResult(req);
    if (!fieldValidationResult.isEmpty()) {
      return { valid: false, message: fieldValidationResult.array().map((item) => item.msg).join(' ') }
    } 

    const babysitterProfile = await this.dbHandler.getBabysitter(babysitterId);
    if (babysitterProfile.length === 0) {
      return { valid: false, message: 'Incorrect id' }
    }

    if (babysitterProfile[0].endTimestamp !== String(END_TIMESTAMP)) {
      return { valid: false, message: 'This user is not active' }
    }

    return { valid: true }
  }

  getDBHandler() {
    return this.dbHandler;
  }

  getParent = async (parentId: number): Promise<UserDelete[]> => {
    return this.dbHandler.getParent(parentId);
  }

  getBabysitter = async (babysitterId: number): Promise<UserDelete[]> => {
    return this.dbHandler.getBabysitter(babysitterId);
  }

  deleteParent = async (parentId: number): Promise<number> => {
    return this.dbHandler.deleteParent(parentId);
  }

  deleteBabysitter = async (babysitterId: number): Promise<number> => {
    return this.dbHandler.deleteBabysitter(babysitterId);
  }
}