import { RequestStatus } from "./contactTypes";

export const setNextStatus = (currentStatus: RequestStatus): RequestStatus => {
  const statusValues = Object.values(RequestStatus);
  return statusValues[statusValues.indexOf(currentStatus) + 1];
};
