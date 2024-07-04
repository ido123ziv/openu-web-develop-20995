
// todo: import connection to db

// todo: here handle all the db queries of this route

export default class DBHandler {

    async getUsers(): Promise<string[]> {
        const query = `SELECT DISTINCT id
                       FROM users`;

        const users = await dbConnection.query(query);

        return users.map(user => user.id);
    }
}