import DBHandler from "./moderatorDBHandler";
import { User, ContactRequest } from "./moderatorTypes";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  getAllUsers = async (): Promise<User[]> => {
    return this.dbHandler.getAllUsers();
  };

  getContactRequests = async (): Promise<ContactRequest[]> => {
    return this.dbHandler.getContactRequests();
  };
}
