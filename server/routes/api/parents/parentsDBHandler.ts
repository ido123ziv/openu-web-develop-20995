import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";
import { Babysitter, Interaction } from "./parentsTypes";

export default class DBHandler {
  async getParent(parentId: number): Promise<number> {
    const query = `SELECT parent_id AS "parentId"
                    FROM parents
                    WHERE parent_id = $1 AND 
                          end_timestamp = $2`;

    const { rows } = await db.query(query, [parentId, END_TIMESTAMP]);
    return rows[0];
  }

  async getBabysitter(babysitterId: number): Promise<number> {
    const query = `SELECT babysitter_id AS id
                   FROM babysitters
                   WHERE babysitter_id = $1 AND 
                         end_timestamp = $2`;

    const { rows } = await db.query(query, [babysitterId, END_TIMESTAMP]);
    return rows[0];
  }

  async validUsers(
    parentId: number,
    babysitterId: number
  ): Promise<number | null> {
    const query = `SELECT b.babysitter_id AS "babysitterId",
                          p.parent_id AS "parentId"
                  FROM 
                      parents_babysitters_interactions i 
                    JOIN 
                      parents p ON i.parent_id = p.parent_id
                    JOIN
                      babysitters b ON i.babysitter_id = b.babysitter_id
                  WHERE p.parent_id = $1 AND
                        b.babysitter_id = $2 AND
                        p.end_timestamp = $3 AND
                        b.end_timestamp = $3`;

    const { rowCount } = await db.query(query, [
      parentId,
      babysitterId,
      END_TIMESTAMP,
    ]);

    return rowCount;
  }

  async getAllBabysitters(): Promise<Babysitter[]> {
    const query = `SELECT b.babysitter_id AS id,
                              babysitter_name AS name,
                              email,
                              city,
                              street,
                              experience,
                              age,
                              phone_number AS "phoneNumber",
                              gender,
                              image_string AS "imageString",
                              comments,
                              AVG(rating) AS rating
                       FROM babysitters AS b
                       JOIN recommendations AS r ON b.babysitter_id=r.babysitter_id
                       WHERE end_timestamp = $1
                       GROUP BY b.babysitter_id`;

    const data = await db.query(query, [END_TIMESTAMP]);
    return data.rows;
  }

  async getInteraction(
    parentId: number,
    babysitterId: number
  ): Promise<Interaction> {
    const query = `SELECT contacted,
                          worked_with AS "workedWith"
                  FROM 
                      parents_babysitters_interactions i 
                    JOIN 
                      parents p ON i.parent_id = p.parent_id
                    JOIN
                      babysitters b ON i.babysitter_id = b.babysitter_id
                  WHERE p.parent_id = $1 AND
                        b.babysitter_id = $2 AND
                        p.end_timestamp = $3 AND
                        b.end_timestamp = $3`;

    const { rows } = await db.query(query, [
      parentId,
      babysitterId,
      END_TIMESTAMP,
    ]);

    return rows[0];
  }

  async updateLastVisited(
    parentId: number,
    babysitterId: number
  ): Promise<void> {
    const query = `UPDATE parents_babysitters_interactions
                    SET last_visit_timestamp = NOW()
                    WHERE parent_id = $1 AND
                          babysitter_id = $2`;

    await db.query(query, [parentId, babysitterId]);
  }

  async createInteraction(
    parentId: number,
    babysitterId: number
  ): Promise<void> {
    const query = `INSERT INTO parents_babysitters_interactions 
                  (last_visit_timestamp, contacted, worked_with, parent_id, babysitter_id)
                  VALUES (NOW(), false, false, $1, $2)`;

    await db.query(query, [parentId, babysitterId]);
  }

  async updateContacted(parentId: number, babysitterId: number): Promise<void> {
    const query = `UPDATE parents_babysitters_interactions
                    SET contacted = true
                    WHERE parent_id = $1 AND
                          babysitter_id = $2`;

    await db.query(query, [parentId, babysitterId]);
  }

  async updateWorkedWith(
    parentId: number,
    babysitterId: number
  ): Promise<void> {
    const query = `UPDATE parents_babysitters_interactions
                    SET worked_with = true
                    WHERE parent_id = $1 AND
                          babysitter_id = $2`;

    await db.query(query, [parentId, babysitterId]);
  }
}
