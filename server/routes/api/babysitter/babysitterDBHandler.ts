import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";
import { interactionsData } from "./babysitterTypes";

export default class DBHandler {
  async countBabysitters(): Promise<number> {
    const query = `SELECT COUNT(*)
                    FROM babysitters`;

    const totalBabysitters = await db.query(query);
    return totalBabysitters.rows[0].count;
  }

  async getBabysitter(babysitterId: number): Promise<number> {
    const query = `SELECT babysitter_id
                  FROM babysitters 
                  WHERE babysitter_id = $1 AND
                        end_timestamp = $2`;

    const babysitter = await db.query(query, [babysitterId, END_TIMESTAMP]);
    return babysitter.rows[0];
  }

  async getNumWatchedProfile(babysitterId: number): Promise<string> {
    const query = `SELECT COUNT(*) AS amount
                    FROM parents_babysitters_interactions
                    WHERE babysitter_id = $1`;

    const numWatched = await db.query(query, [babysitterId]);
    return numWatched.rows[0].amount;
  }

  async putProfileImage(
    imageName: string,
    babysitterId: number
  ): Promise<void> {
    const query = `UPDATE babysitters
                   SET image_string = $1
                   WHERE babysitter_id = $2`;

    await db.query(query, [imageName, babysitterId]);
  }
  async deleteProfileImage(babysitterId: number): Promise<void> {
    const query = `UPDATE babysitters
                   SET image_string = ''
                   WHERE babysitter_id = $1`;

    await db.query(query, [babysitterId]);
  }

  async getProfileImageKey(babysitterId: number): Promise<string> {
    const query = `SELECT image_string AS imageString
            FROM babysitters
            WHERE babysitter_id = ($1)`;
    const imageName = await db.query(query, [babysitterId]);
    return imageName.rows[0].imagestring;
  }

  async getInteractionsData(id: number): Promise<interactionsData> {
    const query = `SELECT COUNT(*) AS "totalCount",
                          SUM(CASE WHEN contacted = TRUE THEN 1 ELSE 0 END) AS contacted,
                          SUM(CASE WHEN worked_with = TRUE THEN 1 ELSE 0 END) AS "workedWith"
                  FROM parents_babysitters_interactions
                  WHERE babysitter_id = $1
                  GROUP BY babysitter_id`;

    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}
