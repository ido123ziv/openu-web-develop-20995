import db from "../../../utils/db/db";
import { RatingObject, Recommendation } from "./recommendationsTypes";

export default class DBHandler {
  async getParent(parentId: number): Promise<number> {
    const parentQuery = `SELECT parent_id
                          FROM parents
                          WHERE parent_id = $1`;

    const parent = await db.query(parentQuery, [parentId]);
    return parent.rows[0];
  }

  async getBabysitter(babysitterId: number): Promise<number> {
    const babysitterQuery = `SELECT babysitter_id
                              FROM babysitters
                              WHERE babysitter_id = $1`;

    const babysitter = await db.query(babysitterQuery, [babysitterId]);
    return babysitter.rows[0];
  }

  async existingRecommendation(
    parentId: number,
    babysitterId: number
  ): Promise<number> {
    const query = `SELECT recommendation_id
                      FROM recommendations
                      WHERE parent_id = $1 AND
                            babysitter_id = $2`;

    const recommendation = await db.query(query, [parentId, babysitterId]);
    return recommendation.rows[0];
  }

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
    const babysitterQuery = `SELECT parent_id AS "parentId",
                                 babysitter_id AS "babysitterId",
                                 rating,
                                 recommendation_text AS "recommendationText" 
                                 FROM recommendations
                                 WHERE babysitter_id = ($1)`;
    const recommendations = await db.query(babysitterQuery, [babysitterId]);
    return recommendations.rows;
  }
  async getBabySitterRating(
    babysitterId: number
  ): Promise<RatingObject[]> {
    const babysitterQuery = `SELECT TRUNC(AVG(rating),2) AS "babysitterRating"
                                 FROM recommendations
                                 WHERE babysitter_id = ($1)`;
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

  async addRecommendation(data: Recommendation) {
    const recommendationQuery = `INSERT INTO recommendations (parent_id, babysitter_id, rating, recommendation_text)
                                  VALUES ($1, $2, $3, $4)`;

    await db.query(recommendationQuery, [
      data.parentId,
      data.babysitterId,
      data.rating,
      data.recommendationText,
    ]);
  }
  async validateBabysitterExists(babysitterId: number): Promise<boolean> {
    const query = `SELECT babysitter_name as "babysitterName"
                    FROM babysitters
                    WHERE babysitter_id = ($1);`;
    const babysitter = await db.query(query, [babysitterId]);
    return babysitter.rows.length > 0;
  }
}
