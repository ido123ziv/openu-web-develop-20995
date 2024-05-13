import axios from "axios";

export const getAllUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/moderator/allUsers"
  );
  console.log(data);
  return data;
  //   return (await axios.get("http://localhost:3000/api/moderator/allUsers")).data;
};
