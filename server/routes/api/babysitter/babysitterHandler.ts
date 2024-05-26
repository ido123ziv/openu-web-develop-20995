import DBHandler from "./babysitterDBHandler";

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  numOfViews = async (babysitterId: number): Promise<string> => {
    return this.dbHandler.getNumWatchedProfile(babysitterId);
  };
}
