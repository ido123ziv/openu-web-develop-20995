import db from "../../../utils/db/db";
import { Recommendation } from "./recommendationsTypes";

export default class DBHandler {
  async getRecommendationPreview(): Promise<Recommendation[]> {
    const previewQuery = `SELECT  parent_id AS "parentId",
                              babysitter_id AS "babysitterId",
                              rating,
                              recommendation_text AS "recommendationText"
                              FROM recommendations
                              LIMIT 10;`;

    const recommendations = await db.query(previewQuery);
    return recommendations.rows;
  }

  async getBabySitterRecommendation(
    babysitterId: number
  ): Promise<Recommendation[]> {
    const babysitterQuery = `SELECT recommendation_id AS id,
                                        parent_name AS "parentName", 
                                        rating,
                                        recommendation_text AS "recommendation" 
                                FROM recommendations NATURAL JOIN parents
                                WHERE babysitter_id = $1`;
    const recommendations = await db.query(babysitterQuery, [babysitterId]);
    return recommendations.rows;
  }

  async getParentRecommendation(parentId: number): Promise<Recommendation[]> {
    const parentQuery = `SELECT  parent_id AS "parentId",
                             babysitter_id AS "babysitterId",
                             rating,
                             recommendation_text AS "recommendationText"
                             FROM recommendations 
                             WHERE parent_id = ($1)`;

    const recommendations = await db.query(parentQuery, [parentId]);
    return recommendations.rows;
  }

  async getParentBabysitterRecommendation(
    parentId: number,
    babysitterId: number
  ): Promise<Recommendation[]> {
    const parentBabysitterQuery = `SELECT  parent_id AS "parentId",
                                       babysitter_id AS "babysitterId",
                                       rating,
                                       recommendation_text AS "recommendationText"
                                       FROM recommendations 
                                       WHERE babysitter_id = ($1) 
                                             AND parent_id = ($2)`;

    const recommendations = await db.query(parentBabysitterQuery, [
      babysitterId,
      parentId,
    ]);
    return recommendations.rows;
  }
}
