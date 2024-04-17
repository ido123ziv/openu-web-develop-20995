import DBHandler from './exampleRouteDBHandler';

// todo: here handle all the functions that are format / validation / transactions

export default class Handler {
    private dbHandler: DBHandler;

    constructor() {
        this.dbHandler = new DBHandler();
    }

    validateSomething(data: { id: number, name: string }): { isValid: boolean, message?: string } {
        if (!data.id) {
            return {isValid: false, message: 'Id is missing'}
        }

        if (!data.name) {
            return {isValid: false, message: 'Name is missing'}
        }

        return {isValid: true};
    }


    async getUsers(): Promise<string[]> {
        return this.dbHandler.getUsers();
    }
}