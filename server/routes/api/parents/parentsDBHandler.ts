import db from "../../../utils/db/db";

export default class DBHandler {
    async getAllBabysitters() {
        const query = 'SELECT * FROM babysitters';

        try {
            const data = await db.query(query);
            return data.rows;
        } catch (error) {
            throw new Error(String(error));
        }
    }
}