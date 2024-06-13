import DBHandler from "./babysitterDBHandler";
import { Validation } from "./babysitterTypes";

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

  numOfViews = async (babysitterId: number): Promise<string> => {
    return this.dbHandler.getNumWatchedProfile(babysitterId);
  };

  putProfileImage = async (imageName: string, babysitterId: number): Promise<void> => {
    return this.dbHandler.putProfileImage(imageName, babysitterId);
  };
  getProfileImage = async (babysitterId: number): Promise<string> => {
    return this.dbHandler.getProfileImageKey(babysitterId);
  };
  deleteProfileImage = async (babysitterId: number): Promise<string> => {
    return this.dbHandler.getProfileImageKey(babysitterId);
  };
}
