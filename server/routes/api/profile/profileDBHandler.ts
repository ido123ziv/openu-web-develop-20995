import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";

import { ParentProfile,BabysitterProfile } from "./profileTypes";

export default class DBHandler {
    async getBabySitterProfile(babysitterId: number): Promise<BabysitterProfile[]> {
        const babysitterQuery = `SELECT * 
                                 FROM babysitters
                                 WHERE babysitter_id = ($1)
                                 AND end_timestamp = ($2)`;
        const profile = await db.query(babysitterQuery, [babysitterId,END_TIMESTAMP]);
        return profile.rows;
    }

    async getParentProfile(parentId: number): Promise<ParentProfile[]> {
        const parentQuery = `SELECT * 
                             FROM parents 
                             WHERE parent_id = ($1)
                             AND end_timestamp = ($2)`;

        const profile = await db.query(parentQuery, [parentId,END_TIMESTAMP]);
        return profile.rows;
    }

    async updateBabySitterProfile(babysitterId: number, fields: string[], params: any[]) {
        params.push(babysitterId)
        const babysitterQuery = `UPDATE babysitters
                                 SET ${fields.join(', ')}
                                 WHERE babysitter_id = $${params.length}`;
        await db.query(babysitterQuery, params);
    }

    async updateParentProfile(parentId: number, fields: string[], params: any[]) {
        params.push(parentId)
        const parentQuery = `UPDATE parents
                             SET ${fields.join(', ')}
                             WHERE parent_id = $${params.length}`;
        await db.query(parentQuery, params);
    }
}