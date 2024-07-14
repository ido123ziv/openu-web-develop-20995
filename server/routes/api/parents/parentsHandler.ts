import * as s3 from "../../../utils/aws/s3";

import DBHandler from "./parentsDBHandler";
import { 
  Babysitter,
  Interaction,
  Validation,
  parentImageResponse
} from "./parentsTypes";
import { calculateDistance } from "./distanceApi";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getDBHandler() {
    return this.dbHandler;
  }

  parentValidation = async (parentId: number): Promise<Validation> => {
    const parent = await this.dbHandler.getParent(parentId);
    if (!parent) {
      return { isValid: false, message: "Parent user doesn't exist" };
    }

    return { isValid: true };
  };

  userValidation = async (
    parentId: number,
    babysitterId: number
  ): Promise<Validation> => {
    const parent = await this.dbHandler.getParent(parentId);
    if (!parent) {
      return { isValid: false, message: "Parent user doesn't exist" };
    }

    const babysitter = await this.dbHandler.getBabysitter(babysitterId);
    if (!babysitter) {
      return { isValid: false, message: "Babysitter user doesn't exist" };
    }

    return { isValid: true };
  };

  interactionValidation = async (
    parentId: number,
    babysitterId: number
  ): Promise<Validation> => {
    const users = await this.dbHandler.validUsers(parentId, babysitterId);
    if (!users) {
      return { isValid: false, message: "Interaction doesn't exist" };
    }

    return { isValid: true };
  };

  countParents = async (): Promise<number> => {
    const count = await this.dbHandler.countParents();

    return count;
  };

  getAllBabysitters = async (parentId: number): Promise<Babysitter[]> => {
    const parentAddress = await this.dbHandler.getParentAddress(parentId);
    const parentAddressString = `${parentAddress?.city}, ${parentAddress?.street}, Israel`;

    const babysitters = await this.dbHandler.getAllBabysitters(parentId);

    return Promise.all(
      babysitters.map(async (babysitter) => {
        let imageUrl;
        const { imageString } = babysitter;
        const babysitterAddress = `${babysitter?.city}, ${babysitter?.street}, Israel`;

        if (imageString && imageString.length > 0) {
          try {
            imageUrl = await s3.getImageUrl(imageString);
            if (!imageUrl) {
              throw new Error("Error fetching image from s3");
            }
          } catch (error) {
            console.error(
              `Error fetching image for babysitter ${babysitter.name}: ${
                (error as Error).message
              }`
            );
          }
        }

        return {
          ...babysitter,
          distance: await calculateDistance(
            parentAddressString,
            babysitterAddress
          ),
          imageString: imageUrl,
        };
      })
    );
  };

  getInteraction = async (
    parentId: number,
    babysitterId: number
  ): Promise<Interaction> => {
    return this.dbHandler.getInteraction(parentId, babysitterId);
  };

  handleInteraction = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    const interaction = await this.getInteraction(parentId, babysitterId);
    if (interaction) {
      await this.dbHandler.updateLastVisited(parentId, babysitterId);
    } else {
      await this.dbHandler.createInteraction(parentId, babysitterId);
    }
  };

  updateContacted = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    await this.dbHandler.updateContacted(parentId, babysitterId);
  };

  updateWorkedWith = async (
    parentId: number,
    babysitterId: number
  ): Promise<void> => {
    await this.dbHandler.updateWorkedWith(parentId, babysitterId);
  };
  putProfileImage = async (
    file: Express.Multer.File,
    imageName: string,
    parentId: number
  ): Promise<string> => {
    const response = await s3.putImage(file, imageName);
    if (!response) {
      return `Couldn't upload image`;
    }
    await this.dbHandler.putProfileImage(imageName, parentId);
    return "";
  };

  getProfileImage = async (
    parentId: number
  ): Promise<parentImageResponse> => {
    const imageName = await this.dbHandler.getProfileImageKey(parentId);
    if (!imageName) {
      return {
        imageUrl: `User doesn't have an image`,
        responseCode: 404,
      };
    }
    const imageUrl = await s3.getImageUrl(imageName);
    if (!imageUrl)
      return {
        imageUrl: "Image not found",
        responseCode: 500,
      };
    return { imageUrl: imageUrl, responseCode: 200 };
  };

  deleteProfileImage = async (parentId: number): Promise<void> => {
    const imageName = await this.dbHandler.getProfileImageKey(parentId);
    if (imageName && imageName.length > 0) {
      await s3.deleteImage(imageName);
      return this.dbHandler.deleteProfileImage(parentId);
    }
  };
}
