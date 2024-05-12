import db from "../../../utils/db/db";
import { UserDelete } from "./deleteUserTypes";

export default class DBHandler {
    async getParent(parentId: number): Promise<UserDelete[]> {
        const parentQuery = `SELECT end_timestamp
                             FROM parents
                             WHERE parent_id = $1 
                             LIMIT 1`;

        const parent = await db.query(parentQuery, [parentId]);
        return parent.rows;
    }

    async getBabysitter(babysitterId: number): Promise<UserDelete[]> {
        const babysitterQuery = `SELECT end_timestamp
                                 FROM babysitters
                                 WHERE babysitter_id = $1 
                                 LIMIT 1`;

        const babysitter = await db.query(babysitterQuery, [babysitterId]);
        return babysitter.rows;
    }

    async deleteParent(parentId: number): Promise<number> {
        const parentQuery = `UPDATE parents
                             SET end_timestamp = $1
                             WHERE parent_id = $2`;
                             
        const newEndTimestamp = new Date().getTime();
        await db.query(parentQuery, [newEndTimestamp, parentId]);
        return newEndTimestamp;
    }

    async deleteBabysitter(babysitterId: number): Promise<number> {
        const babysitterQuery = `UPDATE babysitters
                                 SET end_timestamp = $1
                                 WHERE babysitter_id = $2`;
        
        const newEndTimestamp = new Date().getTime();
        await db.query(babysitterQuery, [newEndTimestamp, babysitterId]);
        return newEndTimestamp;
    }
}