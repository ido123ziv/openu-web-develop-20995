import db from "../../utils/db/db";
import { BabysitterSignup, ParentSignup } from "./signupTypes";

export default class DBHandler {
  async signUpParent(data: ParentSignup) {
    const query = `INSERT INTO parents (parent_name, email, password, city, street, phone_number,gender, min_kid_age, max_kid_age, num_of_kids, comments, end_timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 1)`;

    await db.query(query, [
      data.name,
      data.email,
      data.password,
      data.city,
      data.street,
      data.phoneNumber,
      data.gender,
      data.minKidAge,
      data.maxKidAge,
      data.numOfKids,
      data.comments,
    ]);
  }

  async signUpBabysitter(data: BabysitterSignup) {
    const query = `INSERT INTO babysitters (babysitter_name, email, password, city, street, experience,age, phone_number,gender, comments,end_timestamp)
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1)`;

    await db.query(query, [
      data.name,
      data.email,
      data.password,
      data.city,
      data.street,
      data.experience,
      data.age,
      data.phoneNumber,
      data.gender,
      data.comments,
    ]);
  }

  async existingParent(email: string): Promise<number | null> {
    const query = `SELECT parent_id 
                    FROM parents 
                    WHERE email = $1 AND
                          end_timestamp = 9999999999`;

    const data = await db.query(query, [email]);
    return data.rows[0];
  }

  async existingBabysitter(email: string): Promise<number | null> {
    const query = `SELECT babysitter_id 
                    FROM babysitters 
                    WHERE email = $1 AND
                          end_timestamp = 9999999999`;

    const data = await db.query(query, [email]);
    return data.rows[0];
  }
}
