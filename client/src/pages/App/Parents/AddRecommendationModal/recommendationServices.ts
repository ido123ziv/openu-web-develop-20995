import axios, { AxiosError } from "axios";

import { FormData, IAxiosResponse } from "./RecommendationModalInterfaces";

export const addRecommendation = async (formData: FormData): Promise<void> => {
  try {
    const data = {
      parentId: formData.parentId,
      rating: Number(formData.data.rating),
      recommendationText: formData.data.recommendationText,
    };
    console.log(data, formData.babysitterId);
    await axios.post(
      `http://localhost:3000/api/recommendations/${formData.babysitterId}`,
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    throw ((error as AxiosError).response?.data as IAxiosResponse).message;
  }
};
