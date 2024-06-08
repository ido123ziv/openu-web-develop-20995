import db from "../../../utils/db/db";
import { END_TIMESTAMP } from "../../../utils/global/globals";
import { interactionsData } from "./babysitterTypes";

export default class DBHandler {
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
