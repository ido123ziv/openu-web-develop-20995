import DBHandler from "./profileDBHandler";
import { ParentProfile,BabysitterProfile } from "./profileTypes";

export default class Handler {
    private dbHandler: DBHandler;

    constructor() {
        this.dbHandler = new DBHandler();
      }

    getBabysitterProfile = async (babysitterId: number): Promise<BabysitterProfile[]> => {
        return this.dbHandler.getBabySitterProfile(babysitterId);
    }

    getParentProfile = async (parentId: number): Promise<ParentProfile[]> => {
        return this.dbHandler.getParentProfile(parentId);
    }

    updateBabysitterProfile = async (babysitterId: number, fields: string[]) => {
        this.dbHandler.updateBabySitterProfile(babysitterId, fields);
    }

    updateParentProfile = async (parentId: number, fields: string[]) => {
        this.dbHandler.updateParentProfile(parentId, fields);
    }
}