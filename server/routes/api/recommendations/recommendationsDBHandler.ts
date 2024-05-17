import db from "../../../utils/db/db";
import { Recommendation } from "./recommendationsTypes";
import convertArrayKeysToCamelCase from "../../../utils/parser/camel";

export default class DBHandler {
    async getRecommendationPreview(): Promise<Recommendation[]> {
        const previewQuery = `SELECT * 
                              FROM recommendations
                              LIMIT 10;`

        const recommendations = await db.query(previewQuery);
        return convertArrayKeysToCamelCase<Recommendation>(recommendations.rows);
    }

    async getBabySitterRecommendation(babysitterId: number): Promise<Recommendation[]> {
        const babysitterQuery = `SELECT * 
                                 FROM recommendations
                                 WHERE babysitter_id = ($1)`;
        const recommendations = await db.query(babysitterQuery, [babysitterId]);
        return convertArrayKeysToCamelCase<Recommendation>(recommendations.rows);
    }

    async getParentRecommendation(parentId: number): Promise<Recommendation[]> {
        const parentQuery = `SELECT * 
                             FROM recommendations 
                             WHERE parent_id = ($1)`;

        const recommendations = await db.query(parentQuery, [parentId]);
        return convertArrayKeysToCamelCase<Recommendation>(recommendations.rows);
    }

    async getParentBabysitterRecommendation(parentId: number, babysitterId: number): Promise<Recommendation[]> {
        const parentBabysitterQuery = `SELECT * 
                                       FROM recommendations 
                                       WHERE babysitter_id = ($1) 
                                             AND parent_id = ($2)`;

        const recommendations = await db.query(parentBabysitterQuery, [babysitterId, parentId]);
        return convertArrayKeysToCamelCase<Recommendation>(recommendations.rows);
    }
}