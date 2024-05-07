import db from "../../../utils/db/db";

export default class DBHandler {
  async getAllUsers() {
    const query =
      " SELECT babysitter_id AS id, babysitter_name AS name, email, gender, 'babysitter' AS role FROM babysitters UNION SELECT parent_id AS id, parent_name AS name, email, gender, 'parent' AS role FROM parents";

    try {
      const data = await db.query(query);
      if (data.rows.length > 0) {
        return data.rows;
      }
      return null;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
