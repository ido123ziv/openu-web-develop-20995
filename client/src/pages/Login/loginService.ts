import axios from "axios";
import { FieldValues } from "react-hook-form";

export const userLogin = async (data: FieldValues) => {
  return await axios.post(
    // "http://localhost:8000/login",
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
