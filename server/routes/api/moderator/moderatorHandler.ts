import DBHandler from "./moderatorDBHandler";
import { User, ContactRequest, Validation } from "./moderatorTypes";
import * as s3 from "../../../utils/aws/s3"

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

  userValidation = async (role: string, id: number): Promise<Validation> => {
    const user = await this.dbHandler.getPendingUser(role, id);

    if (!user) {
      return { isValid: false, message: "Invalid User" };
    }

    return { isValid: true };
  };

  getAllUsers = async (): Promise<User[]> => {
    const allUsers = await this.dbHandler.getAllUsers();
    for (const user of allUsers) {
      try {
        // if (user.role === 'babysitter') {
          const { imageString } = user;
          if (imageString) {
            const imageUrl = await s3.getImageUrl(imageString);
            if (!imageUrl) throw new Error('Error fetching image from s3');
            user.imageString = imageUrl;
          }
        // }
      }
      catch (error) {
        console.error(`Error fetching image for babysitter ${user.name}: ${(error as Error).message}`);
      }
    }
    return allUsers;
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

  activateUser = async (role: string, id: number): Promise<void> => {
    return this.dbHandler.activateUser(role, id);
  };

  getAllPendingUsers = async (): Promise<User[]> => {
    return await this.dbHandler.getAllPendingUsers();
  };
}
