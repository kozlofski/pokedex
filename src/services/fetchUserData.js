import { JSON_SERVER_URL } from "../constants";

const fetchUserData = async (userId) => {
  const response = await fetch(`${JSON_SERVER_URL}/${userId}`);
  if (!response) throw new Error("Problem with fetching user data");

  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchUserData;
