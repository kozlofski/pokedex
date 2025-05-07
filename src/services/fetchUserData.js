import { JSON_SERVER_URL } from "../constants";

const fetchUserData = async (userId) => {
  if (userId === "-1") return;

  try {
    const response = await fetch(`${JSON_SERVER_URL}/${userId}`);
    if (!response)
      throw new Error("Problem with fetching user data in fetchUserData.js");

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUserData;
