import DBHandler from "./deleteUserDBHandler";
import { UserDelete } from "./deleteUserTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
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