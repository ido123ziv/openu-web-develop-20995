import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";

import { Babysitter } from "./parentsTypes";

export default class DBHandler {
  async getParent(parentId: number): Promise<number> {
    const query = `SELECT parent_id
                    FROM parents
                    WHERE parent_id = $1 AND end_timestamp = $2`;

    const parent = await db.query(query, [parentId, END_TIMESTAMP]);
    return parent.rows[0];
  }

  async getBabysitter(babysitterId: number): Promise<number> {
    const query = `SELECT babysitter_id
                    FROM babysitters
                    WHERE babysitter_id = $1 AND end_timestamp = $2`;

    const babysitter = await db.query(query, [babysitterId, END_TIMESTAMP]);
    return babysitter.rows[0];
  }

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

  async getInteraction(
    parentId: number,
    babysitterId: number
  ): Promise<number> {
    const query = `SELECT parent_id
                    FROM parents_babysitters_interactions
                    WHERE parent_id = $1 AND 
                    babysitter_id = $2`;

    const interaction = await db.query(query, [parentId, babysitterId]);
    return interaction.rows.length;
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
}
