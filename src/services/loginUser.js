const loginUser = async (
  userName,
  hashedPassword,
  SERVER_URL,
  setLoggedUser,
  setLoggedUserId
) => {
  try {
    const response = await fetch(SERVER_URL);
    if (!response) throw new Error("something is not yes with response");

    const jsonResponse = await response.json();
    const foundUser = jsonResponse.find((user) => user.userName === userName);
    if (!foundUser) throw new Error("user not found");

    const foundUserId = await foundUser.id;

    if (hashedPassword !== foundUser.hashedPassword)
      throw new Error("password incorrect");

    localStorage.setItem("loggedUser", userName);
    localStorage.setItem("loggedUserId", foundUserId);
    localStorage.setItem("loggedUserHashedPassword", hashedPassword);
    setLoggedUser(userName);
    setLoggedUserId(foundUserId);
    return foundUserId;
  } catch (error) {
    window.alert(error);
    throw error;
  }
};

export default loginUser;
