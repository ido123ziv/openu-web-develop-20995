import db from "../../../utils/db/db";
import { User } from "./moderatorTypes";

export default class DBHandler {
  async getAllUsers(): Promise<User[]> {
    const usersQuery = `SELECT babysitter_id AS id, 
                              babysitter_name AS name, 
                              email, 
                              gender, 
                              age, 
                              phone_number AS phoneNumber,
                              experience,
                              image_string AS imageString,
                              comments,
                              'babysitter' AS role
                        FROM babysitters
                        WHERE end_timestamp = 9999999999
                        UNION 
                        SELECT parent_id AS id,
                              parent_name AS name, 
                              email, 
                              gender, 
                              phone_number AS phoneNumber, 
                              min_kid_age AS minKidAge,
                              max_kid_age AS maxKidAge, 
                              num_of_kids AS numOfKids, 
                              comments, 
                              'parent' AS role
                        FROM parents
                        WHERE end_timestamp = 9999999999
                        `;

    const allUsers = await db.query(usersQuery);
    return allUsers.rows;
  }
}
