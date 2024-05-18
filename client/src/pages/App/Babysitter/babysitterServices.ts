import axios from "axios";

import { RecommendationCard } from "./RecommendationCards/RecommendationInterfaces";

export const getRecommendations = async (
  babysitterId: number
): Promise<RecommendationCard[]> => {
  return (
    await axios.get(
      `http://localhost:3000/api/recommendations/babysitter/${babysitterId}`
    )
  ).data;
};
