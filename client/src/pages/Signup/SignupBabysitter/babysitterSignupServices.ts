import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

interface IAxiosResponse {
  message?: string;
}

export const babysitterSignup = async (data: FieldValues) => {
  try {
    const { termsAndConditions, confirmPassword, ...babysitterDetails } = data;
    console.log(babysitterDetails);
    return await axios.post(
      "http://localhost:3000/signup/babysitters",
      JSON.stringify(babysitterDetails),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    throw ((error as AxiosError).response?.data as IAxiosResponse).message;
  }
};
