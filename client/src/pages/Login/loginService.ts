import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

import { User, IAxiosResponse } from "./LoginInterfaces";

export const userLogin = async (data: FieldValues): Promise<User> => {
  try {
    const resData = await axios.post(
      "http://localhost:3000/login",
      JSON.stringify(data),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return resData.data.userDetails;
  } catch (error) {
    throw ((error as AxiosError).response?.data as IAxiosResponse).message;
  }
};
