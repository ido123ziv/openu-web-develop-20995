import db from "../../../utils/db/db";
import { recommendation } from "./recommendationsTypes";
export default class DBHandler {
    async getRecommendationPreview(): Promise<recommendation[] | null> {
        const previewQuery = "SELECT * FROM recommendations LIMIT 10;"
        try {
            const recommendations = await db.query(previewQuery);
            if (recommendations.rows){
                console.log("preview: \n" + recommendations.rows);
                return recommendations.rows;
            }
            else {
                return null
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }
    async getBabySitterRecommendation(babysitter_id: number): Promise<recommendation[] | null> {
        const babysitterQuery = "SELECT * FROM recommendations WHERE babysitter_id = ($1)"
        try {
            const recommendations = await db.query(babysitterQuery, [babysitter_id]);
            if (recommendations.rows){
                console.log(babysitter_id + " " +  recommendations.rows);
                return recommendations.rows;
            }
            else {
                return null
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }
    async getParentRecommendation(parent_id: number): Promise<recommendation[] | null> {
        const parentQuery = "SELECT * FROM recommendations WHERE parent_id = ($1)"
        try {
            const recommendations = await db.query(parentQuery, [parent_id]);
            if (recommendations.rows){
                console.log(recommendations.rows);
                return recommendations.rows;
            }
            else {
                return null
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }
    async getParentBabysitterRecommendation(parent_id: number, babysitter_id: number): Promise<recommendation[] | null> {
        const parentBabysitterQuery = "SELECT * FROM recommendations WHERE babysitter_id = ($1) AND parent_id = ($2)"
        try {
            const recommendations = await db.query(parentBabysitterQuery, [babysitter_id, parent_id]);
            if (recommendations.rows){
                console.log(recommendations.rows);
                return recommendations.rows;
            }
            else {
                return null
            }
        } catch (error) {
            throw new Error(String(error));
        }
    }

}