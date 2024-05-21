import db from "../../../utils/db/db";

export default class DBHandler {
  async getNumWatchedProfile(babysitterId: number): Promise<number> {
    const query = `SELECT COUNT(*)
                    FROM parents_babysitters_interactions
                    WHERE babysitter_id = $1`;

    const numWatched = await db.query(query, [babysitterId]);
    return numWatched.rows.length;
  }
}
