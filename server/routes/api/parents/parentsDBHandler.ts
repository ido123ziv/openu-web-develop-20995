import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";

import { Babysitter } from "./parentsTypes";

export default class DBHandler {
  async getAllBabysitters(): Promise<Babysitter[]> {
    const query = `SELECT babysitter_id AS id,
                              babysitter_name AS name,
                              email,
                              city,
                              street,
                              experience,
                              age,
                              phone_number AS "phoneNumber",
                              gender,
                              image_string AS "imageString",
                              comments
                       FROM babysitters
                       WHERE end_timestamp = $1`;

    const data = await db.query(query, [END_TIMESTAMP]);
    return data.rows;
  }
}
