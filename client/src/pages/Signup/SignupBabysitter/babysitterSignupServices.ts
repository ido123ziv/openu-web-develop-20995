import axios from "axios";
import { FieldValues } from "react-hook-form";

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
    console.log(error);
    throw new Error("An error occurred during signup");
  }
};
