import db from "../../utils/db/db";
import { UserLogin } from "./loginTypes";

export default class DBHandler {
  async login(email: string): Promise<UserLogin | null> {
    const parentQuery = `SELECT parent_id, parent_name, email, password FROM parents WHERE email = $1 LIMIT 1`;
    const babysitterQuery = `SELECT parent_id, parent_name, email, password FROM babysitters WHERE email = $1 LIMIT 1`;

    try {
      const parent = await db.query(parentQuery, [email]);

      if (parent.rows) {
        return { ...parent.rows[0], role: "parents" };
      } else {
        const babysitter = await db.query(babysitterQuery, [email]);
        return { ...babysitter.rows[0], role: "babysitter" };
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
