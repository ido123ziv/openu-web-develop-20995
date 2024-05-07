import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

import { formatUser } from "./helpers";

interface IAxiosResponse {
  message?: string;
}

export const userLogin = async (data: FieldValues) => {
  try {
    const resData = await axios.post(
      "http://localhost:3000/login",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return formatUser(resData.data.userDetails);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const responseData = axiosError.response.data as IAxiosResponse;
        if (responseData.message) {
          throw new Error(responseData.message);
        }
      }
      throw new Error("An error occurred during login");
    } else {
      throw new Error("An error occurred during login");
    }
  }
};
