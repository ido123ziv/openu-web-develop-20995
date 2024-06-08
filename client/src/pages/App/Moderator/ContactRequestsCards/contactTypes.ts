export enum RequestStatus {
  new = "new",
  workingOn = "working-on",
  seen = "seen",
  done = "done",
}

export const Icons: Record<RequestStatus, string> = {
  [RequestStatus.new]: "exclamation circle",
  [RequestStatus.workingOn]: "hourglass half",
  [RequestStatus.seen]: "eye",
  [RequestStatus.done]: "check",
};

export const stringToRequestStatus: Record<string, RequestStatus> = {
  new: RequestStatus.new,
  workingOn: RequestStatus.workingOn,
  seen: RequestStatus.seen,
  done: RequestStatus.done,
};
