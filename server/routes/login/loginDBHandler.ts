import db from "../../utils/db/db";
import { END_TIMESTAMP } from "../../utils/global/globals";
import { UserLogin } from "./loginTypes";

export default class DBHandler {
  async login(email: string): Promise<UserLogin | null> {
    const parentQuery = `SELECT parent_id AS id, 
                                parent_name AS name, 
                                password 
                        FROM parents 
                        WHERE email = $1 AND 
                              end_timestamp = $2
                        LIMIT 1`;

    const babysitterQuery = `SELECT babysitter_id AS id, 
                                    babysitter_name AS name, 
                                    password 
                              FROM babysitters 
                              WHERE email = $1 AND
                                    end_timestamp = $2
                              LIMIT 1`;

    const moderatorQuery = `SELECT moderator_id AS id, 
                            moderator_name AS name, 
                            password 
                            FROM moderators 
                            WHERE email = $1
                            LIMIT 1;`;

    const parent = await db.query(parentQuery, [email, END_TIMESTAMP]);
    if (parent.rowCount) {
      const { parent_id: id, parent_name: name, password } = parent.rows[0];
      return { id, name, password, role: "parents" };
    }

    const babysitter = await db.query(babysitterQuery, [email, END_TIMESTAMP]);
    if (babysitter.rowCount) {
      const {
        babysitter_id: id,
        babysitter_name: name,
        password,
      } = babysitter.rows[0];
      return { id, name, password, role: "babysitter" };
    }

    const moderator = await db.query(moderatorQuery, [email]);
    if (moderator.rowCount) {
      const {
        moderator_id: id,
        moderator_name: name,
        password,
      } = moderator.rows[0];
      return { id, name, password, role: "moderator" };
    }

    return null;
  }
}
