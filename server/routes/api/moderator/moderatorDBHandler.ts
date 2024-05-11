import db from "../../../utils/db/db";
import { User } from "./moderatorTypes";

export default class DBHandler {
  async getAllUsers(): Promise<User[]> {
    const usersQuery = `SELECT babysitter_id AS id, babysitter_name AS name, email, gender, 'babysitter' AS role
                        FROM babysitters
                        UNION SELECT parent_id AS id, parent_name AS name, email, gender, 'parent' AS role
                        FROM parents
     `;
    const allUsers = await db.query(usersQuery);
    return allUsers.rows;
  }
}
