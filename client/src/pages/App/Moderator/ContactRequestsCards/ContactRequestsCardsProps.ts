export interface ContactData {
  requestStatus: RequestStatus;
  email: string;
  name: string;
  title: string;
  message: string;
}

export interface ContactDataArr {
  data: ContactData[];
}

enum RequestStatus {
  New = "new",
  WorkingOn = "working-on",
  Seen = "seen",
  Done = "done",
}

export const Icons: Record<RequestStatus, string> = {
  [RequestStatus.New]: "exclamation circle",
  [RequestStatus.WorkingOn]: "hourglass half",
  [RequestStatus.Seen]: "eye",
  [RequestStatus.Done]: "check",
};
