import DBHandler from "./parentsDBHandler";
import { Babysitter } from "./parentsTypes";

export default class Handler {
    private dbHandler: DBHandler;
  
    constructor() {
      this.dbHandler = new DBHandler();
    }
  
    getDBHandler() {
      return this.dbHandler;
    }

    getAllBabysitters = async (): Promise<Babysitter[]> => {
      return this.dbHandler.getAllBabysitters();
    }
}