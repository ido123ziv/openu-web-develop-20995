import DBHandler from "./moderatorDBHandler";
import { User, ContactRequest, Validation } from "./moderatorTypes";

enum RequestStatus {
  "new",
  "seen",
  "working-on",
  "done",
}

export default class Handler {
  private dbHandler: DBHandler;

  constructor() {
    this.dbHandler = new DBHandler();
  }

  requestValidation = async (
    requestId: number,
    newStatus: string
  ): Promise<Validation> => {
    const contactRequest = await this.dbHandler.getContactRequest(requestId);
    if (!newStatus) {
      return { isValid: false, message: "field 'status' is undefined" };
    }

    if (!contactRequest.length) {
      return { isValid: false, message: "Incorrect id" };
    }

    if (
      typeof newStatus !== "string" ||
      !Object.values(RequestStatus).includes(newStatus)
    ) {
      return { isValid: false, message: "Incorrect status" };
    }

    return { isValid: true };
  };

  getAllUsers = async (): Promise<User[]> => {
    return this.dbHandler.getAllUsers();
  };

  getContactRequests = async (): Promise<ContactRequest[]> => {
    return this.dbHandler.getContactRequests();
  };

  editContactRequestStatus = async (
    requestId: number,
    newStatus: string
  ): Promise<void> => {
    return this.dbHandler.editContactRequestStatus(requestId, newStatus);
  };
}
