import db from "../../../utils/db/db";

export default class DBHandler {
    async allBabysitters() {
        const query = 'SELECT * FROM babysitters';

        try {
            const data = await db.query(query);
            return data;
        } catch (error) {
            throw new Error(String(error));
        }
    }
}