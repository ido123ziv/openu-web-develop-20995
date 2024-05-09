import db from "../../utils/db/db";
import { BabysitterSignup, ParentSignup } from "./signupTypes";

export default class DBHandler {
  async signUpParent(data: ParentSignup) {
    const query = `INSERT INTO parents (parent_name, email, password, city, street, phone_number,gender, min_kid_age, max_kid_age, num_of_kids, comments)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

    try {
      await db.query(query, Object.values({ ...data }));
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async signUpBabysitter(data: BabysitterSignup) {
    const query = `INSERT INTO babysitters (babysitter_name, email, password, city, street, experience,age, phone_number,gender, comments)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

    try {
      await db.query(query, Object.values({ ...data }));
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async existingParent(email: string): Promise<number | null> {
    const query = `SELECT parent_id FROM parents WHERE email = $1`;

    try {
      const data = await db.query(query, [email]);
      return data.rows[0];
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async existingBabysitter(email: string): Promise<number | null> {
    const query = `SELECT babysitter_id FROM babysitters WHERE email = $1`;

    try {
      const data = await db.query(query, [email]);
      return data.rows[0];
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
