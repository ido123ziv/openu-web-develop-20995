import axios from "axios";

import { CardsData } from "../../../ui/CardsView/CardViewProps";

export const getAllBabysitters = async (
  parentId: number
): Promise<CardsData[]> => {
  return (
    await axios.get(
      `http://localhost:3000/api/parents/allBabysitters/${parentId}`
    )
  ).data;
};

export const getImage = async (parentId: number) => {
  return (
    await axios.get(
      `http://localhost:3000/api/parents/image/${parentId}`
    )
  ).data;
};
