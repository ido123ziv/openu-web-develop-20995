import db from "../../utils/db/db";
import { UserLogin } from "./loginTypes";

export default class DBHandler {
  async login(email: string): Promise<UserLogin | null> {
    const parentQuery = `SELECT parent_id, parent_name, password FROM parents WHERE email = $1 LIMIT 1`;
    const babysitterQuery = `SELECT babysitter_id, babysitter_name, password FROM babysitters WHERE email = $1 LIMIT 1`;
    const moderatorQuery = `SELECT moderator_id, moderator_name, password FROM moderators WHERE email = $1 LIMIT 1;`;

    const parent = await db.query(parentQuery, [email]);
    if (parent.rowCount) {
      const { parent_id: id, parent_name: name, password } = parent.rows[0];
      return { id, name, password, role: "parents" };
    }

    const babysitter = await db.query(babysitterQuery, [email]);
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
