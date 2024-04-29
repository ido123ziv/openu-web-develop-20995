import dbConnection from "../../utils/db/dbConnection";
import db from "../../utils/db/db";

export default class DBHandler {
  async login(email: string, password: string) {
    console.log("INDBHANDLERRRRRRRRRRRRR", { email }, { password });
    const query = `select * from parents`; //TODO: FIX

    const parents = await db.query(query, [email, password]);

    console.log(parents);
    return;
  }
}
