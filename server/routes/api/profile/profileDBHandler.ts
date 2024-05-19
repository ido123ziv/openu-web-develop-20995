import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";

import { ParentProfile,BabysitterProfile } from "./profileTypes";

export default class DBHandler {
    async getBabySitterProfile(babysitterId: number): Promise<BabysitterProfile[]> {
        const babysitterQuery = `SELECT babysitter_name AS "name",
                                 email,
                                 city,
                                 street,
                                 gender,
                                 experience,
                                 age,
                                 phone_number AS "phoneNumber",
                                 comments
                                 FROM babysitters
                                 WHERE babysitter_id = ($1)
                                 AND end_timestamp = ($2)`;
        const profile = await db.query(babysitterQuery, [babysitterId,END_TIMESTAMP]);
        return profile.rows;
    }

    async getParentProfile(parentId: number): Promise<ParentProfile[]> {
        const parentQuery = `SELECT parent_name AS "name",
                             email,
                             city,
                             street,
                             gender,
                             phone_number AS "phoneNumber",
                             min_kid_age AS "minKidAge",
                             max_kid_age AS "maxKidAge",
                             num_of_kids AS "numOfKids",
                             comments
                             FROM parents 
                             WHERE parent_id = ($1)
                             AND end_timestamp = ($2)`;

        const profile = await db.query(parentQuery, [parentId,END_TIMESTAMP]);
        return profile.rows;
    }


}