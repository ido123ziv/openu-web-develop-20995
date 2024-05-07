import axios from "axios";
import { FieldValues } from "react-hook-form";

export const parentSignup = async (data: FieldValues) => {
  try {
    const { termsAndConditions, confirmPassword, ...parentDetails } = data;
    console.log(parentDetails);
    return await axios.post(
      "http://localhost:3000/signup/parents",
      JSON.stringify(parentDetails),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    throw new Error("An error occurred during signup");
  }
};
