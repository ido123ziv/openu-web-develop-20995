import db from "../../../utils/db/db";

import { Babysitter } from "./parentsTypes";

export default class DBHandler {
    async getAllBabysitters(): Promise<Babysitter[]>{
        const query = `SELECT * 
                       FROM babysitters`;

        const data = await db.query(query);
        return data.rows;
    }
}