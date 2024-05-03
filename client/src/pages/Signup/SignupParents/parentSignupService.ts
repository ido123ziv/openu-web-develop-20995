import axios from "axios";
import { FieldValues } from "react-hook-form";

export const parentSignup = async (data: FieldValues) => {
  return await axios.post(
    //   "http://localhost:8000/signup",
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
