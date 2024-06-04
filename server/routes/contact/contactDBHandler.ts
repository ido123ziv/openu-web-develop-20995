import db from "../../utils/db/db";
import { UserContact } from "./contactTypes";

export default class DBHandler {
  async contact(data: UserContact) {
    const query = `INSERT INTO contact_requests (user_name, user_email, message_title, user_message)
                   VALUES ($1, $2, $3, $4)`;

    await db.query(query, [
      data.name,
      data.email,
      data.title,
      data.message
    ]); 
  }
}   