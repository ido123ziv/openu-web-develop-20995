import axios, { AxiosError } from "axios";

export interface IFormData {
  name: string;
  email: string;
  title: string;
  message: string;
}

export const postContactRequest = async (data: IFormData) => {
  try {
    return axios.post("http://localhost:3000/contact", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw (error as AxiosError).response;
  }
};
