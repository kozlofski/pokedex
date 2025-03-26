const loginUser = async (userName, password, SERVER_URL) => {
  try {
    const response = await fetch(SERVER_URL);
    if (!response) throw new Error("something is not yes with response");

    const jsonResponse = await response.json();
    const foundUser = jsonResponse.find((user) => user.userName === userName);
    if (!foundUser) throw new Error("user not found");

    const foundUserId = await foundUser.id;
    if (password !== foundUser.password) throw new Error("password incorrect");

    localStorage.setItem("loggedUser", userName);
    localStorage.setItem("loggedUserId", foundUserId);
    return foundUserId;
  } catch (error) {
    throw new Error(error);
  }
};

export default loginUser;
