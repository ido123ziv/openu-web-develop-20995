import axios from "axios";

import { RecommendationCard } from "./RecommendationCards/RecommendationInterfaces";
import { InteractionsData } from "./StatsChart/StatsChartProps";

export const getRecommendations = async (
  babysitterId: number
): Promise<RecommendationCard[]> => {
  return (
    await axios.get(
      `http://localhost:3000/api/recommendations/babysitter/${babysitterId}`
    )
  ).data;
};

export const getNumOfViews = async (babysitterId: number): Promise<string> => {
  return (
    await axios.get(`http://localhost:3000/api/babysitter/${babysitterId}`)
  ).data.numOfViews;
};

export const getInteractionsData = async (
  babysitterId: number
): Promise<InteractionsData[]> => {
  return (
    await axios.get(
      `http://localhost:3000/api/babysitter/interactions/${babysitterId}`
    )
  ).data.data;
};
