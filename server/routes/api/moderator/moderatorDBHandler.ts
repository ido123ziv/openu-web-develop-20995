import db from "../../../utils/db/db";
import {
  END_TIMESTAMP,
  PENDING_USER_TIMESTAMP,
} from "../../../utils/global/globals";
import { User, ContactRequest } from "./moderatorTypes";

export default class DBHandler {
  async getPendingUser(table: string, id: number): Promise<number | null> {
    const query = `SELECT *
                    FROM ${table}
                    WHERE ${table.slice(0, -1) + "_id"} = $1 AND
                          end_timestamp = $2`;

    const user = await db.query(query, [id, PENDING_USER_TIMESTAMP]);
    return user.rowCount;
  }

  async getAllUsers(): Promise<User[]> {
    const parentQuery = `SELECT parent_id AS id,
                                parent_name AS name, 
                                email, 
                                gender, 
                                phone_number AS "phoneNumber", 
                                min_kid_age AS "minKidAge",
                                max_kid_age AS "maxKidAge", 
                                num_of_kids AS "numOfKids", 
                                comments, 
                                'parent' AS role
                        FROM parents
                        WHERE end_timestamp = $1`;

    const babysitterQuery = `SELECT b.babysitter_id AS id, 
                                  babysitter_name AS name, 
                                  email, 
                                  gender, 
                                  city,
                                  street,
                                  age, 
                                  phone_number AS "phoneNumber",
                                  experience,
                                  image_string AS "imageString",
                                  comments,
                                  ROUND(AVG(rating), 2) AS rating,
                                  'babysitter' AS role
                          FROM babysitters AS b
                          LEFT JOIN recommendations AS r ON b.babysitter_id=r.babysitter_id
                          WHERE end_timestamp = $1
                          GROUP BY b.babysitter_id`;

    const parents = await db.query(parentQuery, [END_TIMESTAMP]);
    const babysitters = await db.query(babysitterQuery, [END_TIMESTAMP]);

    return [...parents.rows, ...babysitters.rows];
  }

  async getContactRequest(requestId: number): Promise<ContactRequest[]> {
    const query = `SELECT request_status AS "requestStatus",
                          user_name AS name,
                          user_email AS email,
                          message_title AS title,
                          user_message AS message
                   FROM contact_requests
                   WHERE request_id = $1`;

    const contactRequest = await db.query(query, [requestId]);

    return contactRequest.rows;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    const query = `SELECT request_id as "requestId",
                          request_status AS "requestStatus",
                          user_name AS name,
                          user_email AS email,
                          message_title AS title,
                          user_message AS message
                   FROM contact_requests
                   WHERE request_status != 'done'
                   ORDER BY request_id`;

    const contactRequests = await db.query(query);

    return contactRequests.rows;
  }

  async editContactRequestStatus(
    requestId: number,
    newStatus: string
  ): Promise<void> {
    const query = `UPDATE contact_requests
                   SET request_status = $1
                   WHERE request_id = $2`;

    await db.query(query, [newStatus, requestId]);
  }

  async activateUser(table: string, id: number): Promise<void> {
    const query = `UPDATE ${table}
                    SET end_timestamp = $1
                    WHERE ${table.slice(0, -1) + "_id"} = $2`;

    await db.query(query, [END_TIMESTAMP, id]);
  }

  async getAllPendingUsers(): Promise<User[]> {
    const parentQuery = `SELECT parent_id AS id,
                                parent_name AS name, 
                                email, 
                                gender, 
                                phone_number AS "phoneNumber", 
                                min_kid_age AS "minKidAge",
                                max_kid_age AS "maxKidAge", 
                                num_of_kids AS "numOfKids", 
                                comments, 
                                'parent' AS role
                        FROM parents
                        WHERE end_timestamp = $1`;

    const babysitterQuery = `SELECT babysitter_id AS id, 
                                  babysitter_name AS name, 
                                  email, 
                                  gender, 
                                  city,
                                  street,
                                  age, 
                                  phone_number AS "phoneNumber",
                                  experience,
                                  image_string AS "imageString",
                                  comments,
                                  'babysitter' AS role
                          FROM babysitters
                          WHERE end_timestamp = $1`;

    const parents = await db.query(parentQuery, [PENDING_USER_TIMESTAMP]);
    const babysitters = await db.query(babysitterQuery, [
      PENDING_USER_TIMESTAMP,
    ]);

    return [...parents.rows, ...babysitters.rows];
  }
}
