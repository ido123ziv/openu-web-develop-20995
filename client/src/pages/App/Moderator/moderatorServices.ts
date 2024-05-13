import axios from "axios";

export const getAllUsers = async () => {
  return (await axios.get("http://localhost:3000/api/moderator/allUsers")).data;
};
