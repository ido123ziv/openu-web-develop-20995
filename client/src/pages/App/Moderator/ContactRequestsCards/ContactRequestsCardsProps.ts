import { RequestStatus } from "./contactTypes";

export interface ContactData {
  requestId: number;
  requestStatus: RequestStatus;
  email: string;
  name: string;
  title: string;
  message: string;
}

export interface ContactDataArr {
  data: ContactData[];
}
