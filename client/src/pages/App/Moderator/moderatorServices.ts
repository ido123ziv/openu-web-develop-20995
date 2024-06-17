import axios from "axios";

import { CardsData } from "../../../ui/CardsView/CardViewProps";

export const getAllUsers = async (): Promise<CardsData[]> => {
  return (await axios.get("http://localhost:3000/api/moderator/allUsers")).data;
};

export const getAllContactRequests = async () => {
  return (
    await axios.get("http://localhost:3000/api/moderator/allContactRequests")
  ).data;
};

export const getAllPendingUsers = async () => {
  return (await axios.get("http://localhost:3000/api/moderator/pending")).data;
};
