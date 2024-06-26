import DBHandler from "./deleteUserDBHandler";
import { UserDelete, Validation } from "./deleteUserTypes";
import { END_TIMESTAMP } from "../../../utils/global/globals";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  parentValidation = async (parentId: number): Promise<Validation> => {
    const parentProfile = await this.dbHandler.getParent(parentId);
    if (!parentProfile.length) {
      return { isValid: false, message: "Incorrect id" };
    }

    if (Number(parentProfile[0].endTimestamp) !== END_TIMESTAMP) {
      return { isValid: false, message: "This user is not active" };
    }

    return { isValid: true };
  };

  babysitterValidation = async (babysitterId: number): Promise<Validation> => {
    const babysitterProfile = await this.dbHandler.getBabysitter(babysitterId);
    if (!babysitterProfile.length) {
      return { isValid: false, message: "Incorrect id" };
    }

    if (Number(babysitterProfile[0].endTimestamp) !== END_TIMESTAMP) {
      return { isValid: false, message: "This user is not active" };
    }

    return { isValid: true };
  };

  getDBHandler() {
    return this.dbHandler;
  }

  getParent = async (parentId: number): Promise<UserDelete[]> => {
    return this.dbHandler.getParent(parentId);
  };

  getBabysitter = async (babysitterId: number): Promise<UserDelete[]> => {
    return this.dbHandler.getBabysitter(babysitterId);
  };

  deleteParent = async (parentId: number): Promise<void> => {
    return this.dbHandler.deleteParent(parentId);
  };

  deleteBabysitter = async (babysitterId: number): Promise<void> => {
    return this.dbHandler.deleteBabysitter(babysitterId);
  };
}
