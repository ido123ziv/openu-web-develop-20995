import DBHandler from "./profileDBHandler";
import {ParentProfile, BabysitterProfile, Validation, BabysitterUpdate, ParentUpdate} from "./profileTypes";


export default class Handler {
    private dbHandler: DBHandler;

    constructor() {
        this.dbHandler = new DBHandler();
    }

    parentValidation = async(parentId: number): Validation => {
        const parentProfile = await this.dbHandler.getParentProfile(parentId);

        if (parentProfile.length === 0) {
          return { isValid: false, message: 'Incorrect id' }
        }

        return { isValid: true }
    }

    parentUpdateValidation = async(parentId: number, parentData: ParentUpdate): Validation => {
        const validateParentId = await this.parentValidation(parentId);
        if (!validateParentId.isValid){
            return validateParentId;
        }

        const allUndefined = Object.values(parentData).every((value) => value === undefined);
        if (allUndefined){
            return { isValid: false, message: 'All fields are undefined' };
        }

        return { isValid: true };
    }
    
    babysitterValidation = async(babysitterId: number): Validation => {
        const babysitterProfile = await this.dbHandler.getBabySitterProfile(babysitterId);
        if (babysitterProfile.length === 0) {
          return { isValid: false, message: 'Incorrect id' }
        }

        return { isValid: true }
    }

    babysitterUpdateValidation = async (babysitterId: number, babysitterData: BabysitterUpdate): Validation => {

        const validateBabysitterId = await this.babysitterValidation(babysitterId);
        if (!validateBabysitterId.isValid){
            return validateBabysitterId;
        }

        const allUndefined = Object.values(babysitterData).every((value) => value === undefined);
        if (allUndefined){
            return { isValid: false, message: 'All fields are undefined' };
        }

        return { isValid: true };
    }

    getBabysitterProfile = async (babysitterId: number): Promise<BabysitterProfile> => {
        const profile = await this.dbHandler.getBabySitterProfile(babysitterId);
        return profile[0];
    }

    getParentProfile = async (parentId: number): Promise<ParentProfile> => {
        const profile = this.dbHandler.getParentProfile(parentId);
        return profile[0];
    }

    updateBabysitterProfile = async (babysitterId: number, babysitterData: BabysitterUpdate): Promise<void> => {
        return this.dbHandler.updateBabySitterProfile(babysitterId, babysitterData);
    }

    updateParentProfile = async (parentId: number, parentData: ParentUpdate): Promise<void> => {
        return this.dbHandler.updateParentProfile(parentId, parentData);
    }
}