import db from "../../../utils/db/db";
import { Babysitter } from "./parentsTypes";
import { END_TIMESTAMP } from "../../../utils/global/globals"

export default class DBHandler {
    async getAllBabysitters(): Promise<Babysitter[]>{
        const query = `SELECT * 
                       FROM babysitters
                       WHERE end_timestamp = $1`;

        const data = await db.query(query, [END_TIMESTAMP]);
        return data.rows;
    }
}