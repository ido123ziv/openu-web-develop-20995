import axios from "axios";

import { Interaction } from "./ModalViewInterface";

export const getInteraction = async (
  parentId: number,
  babysitterId: number
): Promise<Interaction | undefined> => {
  const { data } = await axios.get(
    `http://localhost:3000/api/parents/${parentId}/babysitter/${babysitterId}`
  );

  return data.interaction;
};

export const updateLastVisited = async (
  parentId: number,
  babysitterId: number
) => {
  return await axios.put(
    `http://localhost:3000/api/parents/${parentId}/babysitter/${babysitterId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const updateContacted = async (
  parentId: number,
  babysitterId: number
) => {
  return await axios.put(
    `http://localhost:3000/api/parents/${parentId}/babysitter/${babysitterId}/contacted`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const updateWorkedWith = async (
  parentId: number,
  babysitterId: number
) => {
  return await axios.put(
    `http://localhost:3000/api/parents/${parentId}/babysitter/${babysitterId}/workedwith`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const getBabysitterRecommendations = async (babysitterId: number) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/recommendations/babysitter/${babysitterId}`
  );

  return data;
};
