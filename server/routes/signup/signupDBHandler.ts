import db from "../../utils/db/db";
import { ParentSignup } from "./signupTypes";

export default class DBHandler {
  async signUpParent(data: ParentSignup) {
    //TODO: ADD EMAIL AND PASSWORD AND GENDER
    const query = `INSERT INTO parents (parent_name, city, street, phone_number, min_kid_age, max_kid_age, num_of_kid, comments)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    try {
      await db.query(query, Object.values({ ...data }));
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
