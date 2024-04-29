import db from "../../utils/db/db";

export default class DBHandler {
  async login(email: string, password: string) {
    const query = `select * from parents`;

    const parents = await db.query(query);

    console.log(parents.rows[0]);
    return;
  }
}
