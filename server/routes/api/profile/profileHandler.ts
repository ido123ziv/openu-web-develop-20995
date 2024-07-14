import DBHandler from "./profileDBHandler";
import {ParentProfile, BabysitterProfile, Validation, BabysitterUpdate, ParentUpdate} from "./profileTypes";
import * as s3 from "../../../utils/aws/s3"


export default class Handler {
    private dbHandler: DBHandler;

    constructor() {
        this.dbHandler = new DBHandler();
    }

    parentValidation = async(parentId: number): Promise<Validation> => {
        const parentProfile = await this.dbHandler.getParentProfile(parentId);

        if (parentProfile.length === 0) {
          return { isValid: false, message: 'Incorrect id' }
        }

        return { isValid: true }
    }

    parentUpdateValidation = async(parentId: number, parentData: ParentUpdate): Promise<Validation> => {
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
    
    babysitterValidation = async(babysitterId: number): Promise<Validation> => {
        const babysitterProfile = await this.dbHandler.getBabySitterProfile(babysitterId);
        if (babysitterProfile.length === 0) {
          return { isValid: false, message: 'Incorrect id' }
        }

        return { isValid: true }
    }

    babysitterUpdateValidation = async (babysitterId: number, babysitterData: BabysitterUpdate): Promise<Validation> => {

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
        const babysitterProfile =  profile[0];
        try {
            if (babysitterProfile.imageString && babysitterProfile.imageString.length > 0){
                const imageUrl = await s3.getImageUrl(babysitterProfile.imageString);
                if (!imageUrl) throw new Error('Error fetching image from s3');
                babysitterProfile.imageString = imageUrl;
            }
          } catch (error) {
            console.error(`Error fetching image for babysitter ${babysitterProfile.name}: ${(error as Error).message}`);
          }
        return babysitterProfile;
    }

    getParentProfile = async (parentId: number): Promise<ParentProfile> => {
        const profile = await this.dbHandler.getParentProfile(parentId);
        const parentProfile = profile[0];
        try {
            if (parentProfile.imageString && parentProfile.imageString.length > 0){
                const imageUrl = await s3.getImageUrl(parentProfile.imageString);
                if (!imageUrl) throw new Error('Error fetching image from s3');
                parentProfile.imageString = imageUrl;
            }
          } catch (error) {
            console.error(`Error fetching image for babysitter ${parentProfile.name}: ${(error as Error).message}`);
          }
        return parentProfile;
    }

    updateBabysitterProfile = async (babysitterId: number, babysitterData: BabysitterUpdate): Promise<void> => {
        return this.dbHandler.updateBabySitterProfile(babysitterId, babysitterData);
    }

    updateParentProfile = async (parentId: number, parentData: ParentUpdate): Promise<void> => {
        return this.dbHandler.updateParentProfile(parentId, parentData);
    }
}