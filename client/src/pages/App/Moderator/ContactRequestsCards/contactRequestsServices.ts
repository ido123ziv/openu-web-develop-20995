import axios from "axios";

export const updateRequestStatus = async (
  id: number,
  newStatus: string
): Promise<void> => {
  return await axios.put(
    `http://localhost:3000/api/moderator/editContactRequestStatus/${id}`,
    JSON.stringify({ status: newStatus }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
