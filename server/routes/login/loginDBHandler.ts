import dbConnection from "../../utils/db/dbConnection";

export default class DBHandler {
  async login(email: string, password: string) {
    console.log("INDBHANDLERRRRRRRRRRRRR", { email }, { password });
    const query = `select * from parents`; //TODO: FIX

    const parents = await dbConnection.query(query, [email, password]);

    console.log(parents);
    return;
  }
}
