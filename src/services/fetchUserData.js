const fetchUserData = async (SERVER_URL, userId) => {
  const response = await fetch(`${SERVER_URL}/${userId}`);
  if (!response) throw new Error("Problem with fetching favourites");

  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchUserData;
