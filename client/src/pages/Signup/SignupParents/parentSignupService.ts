import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

interface IAxiosResponse {
  message?: string;
}

export const parentSignup = async (data: FieldValues): Promise<void> => {
  try {
    const { termsAndConditions, confirmPassword, ...parentDetails } = data;
    return axios.post(
      "http://localhost:3000/signup/parents",
      JSON.stringify(parentDetails),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    throw ((error as AxiosError).response?.data as IAxiosResponse).message;
  }
};
