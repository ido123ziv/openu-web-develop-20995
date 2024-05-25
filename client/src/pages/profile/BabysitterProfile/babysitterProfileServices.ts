import axios from "axios";

import { BabysitterData } from "./BabysitterProfileInterfaces";

export const getProfile = async (
  babysitterId: number
): Promise<BabysitterData> => {
  return (
    await axios.get(
      `http://localhost:3000/api/profile/babysitter/${babysitterId}`
    )
  ).data;
};

export const updateProfile = (
  babysitterId: number,
  data: BabysitterData
): Promise<void> => {
  return axios.put(
    `http://localhost:3000/api/profile/babysitter/update/${babysitterId}`,
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const deleteProfile = async (babysitterId: number): Promise<void> => {
  return await axios.put(
    `http://localhost:3000/api/delete/babysitter/${babysitterId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
