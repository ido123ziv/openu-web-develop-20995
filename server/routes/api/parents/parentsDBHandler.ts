import db from "../../../utils/db/db";
import convertArrayKeysToCamelCase from "../../../utils/parser/camel";

import { Babysitter } from "./parentsTypes";

const ACTIVE_END_TIMESTAMP = '9999999999';

export default class DBHandler {
    async getAllBabysitters(): Promise<Babysitter[]>{
        const query = `SELECT * 
                       FROM babysitters
                       WHERE end_timestamp = $1`;

        const data = await db.query(query, [ACTIVE_END_TIMESTAMP]);
        return convertArrayKeysToCamelCase<Babysitter>(data.rows);
    }
}