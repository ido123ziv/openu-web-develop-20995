import axios from "axios";

import { ParentData } from "./parentProfileInterfaces";

export const getProfile = async (babysitterId: number): Promise<ParentData> => {
  return (
    await axios.get(`http://localhost:3000/api/profile/parent/${babysitterId}`)
  ).data;
};

export const updateProfile = (
  babysitterId: number,
  data: ParentData
): Promise<void> => {
  return axios.put(
    `http://localhost:3000/api/profile/parent/update/${babysitterId}`,
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
