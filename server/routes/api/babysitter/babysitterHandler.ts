import DBHandler from "./babysitterDBHandler";
import {
  babysitterImageResponse,
  interactionsData,
  Validation,
} from "./babysitterTypes";
import * as s3 from "../../../utils/aws/s3";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  userValidation = async (babysitterId: number): Promise<Validation> => {
    const babysitter = await this.dbHandler.getBabysitter(babysitterId);
    if (!babysitter) {
      return { isValid: false, message: "Babysitter doesn't exist" };
    }

    return { isValid: true };
  };

  countBabysitters = async (): Promise<number> => {
    return this.dbHandler.countBabysitters();
  };

  numOfViews = async (babysitterId: number): Promise<string> => {
    return this.dbHandler.getNumWatchedProfile(babysitterId);
  };

  getInteractions = async (id: number): Promise<interactionsData | void> => {
    const data = await this.dbHandler.getInteractionsData(id);
    if (!data) {
      return;
    }

    return {
      totalCount: Number(data?.totalCount) || 0,
      contacted: Number(data?.contacted) || 0,
      workedWith: Number(data?.workedWith) || 0,
    };
  };

  putProfileImage = async (
    file: Express.Multer.File,
    imageName: string,
    babysitterId: number
  ): Promise<string> => {
    const response = await s3.putImage(file, imageName);
    if (!response) {
      return `Couldn't upload image`;
    }
    await this.dbHandler.putProfileImage(imageName, babysitterId);
    return "";
  };

  getProfileImage = async (
    babysitterId: number
  ): Promise<babysitterImageResponse> => {
    const imageName = await this.dbHandler.getProfileImageKey(babysitterId);
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

  deleteProfileImage = async (babysitterId: number): Promise<void> => {
    const imageName = await this.dbHandler.getProfileImageKey(babysitterId);
    if (imageName && imageName.length > 0) {
      await s3.deleteImage(imageName);
      return this.dbHandler.deleteProfileImage(babysitterId);
    }
  };
}
