import DBHandler from "./moderatorDBHandler";
import { User } from "./moderatorTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getAllUsers = async (): Promise<User[]> => {
    return this.dbHandler.getAllUsers();
  };
}
