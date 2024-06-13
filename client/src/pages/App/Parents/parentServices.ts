import axios from "axios";

import { CardsData } from "../../../ui/CardsView/CardViewProps";

export const getAllBabysitters = async (): Promise<CardsData[]> => {
  return (await axios.get("http://localhost:3000/api/parents/allBabysitters")).data;
};
