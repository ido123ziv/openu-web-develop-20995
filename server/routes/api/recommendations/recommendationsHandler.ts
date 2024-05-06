import DBHandler from "./recommendationsDBHandler";
export default class Handler {
    private dbHandler = new DBHandler();
    getDBHandler() {
        return this.dbHandler;
    }
}