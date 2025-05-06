import { enqueueSnackbar } from "notistack";

const loginUser = async (
  userName,
  hashedPassword,
  SERVER_URL,
  setLoggedUser,
  setLoggedUserId
) => {
  try {
    const response = await fetch(SERVER_URL);
    if (!response) throw new Error("JSON server bad response");

    const jsonResponse = await response.json();
    const foundUser = jsonResponse.find((user) => user.userName === userName);
    if (!foundUser) {
      enqueueSnackbar("Użytkownik nie znaleziony");
      throw new Error("user not found");
    }

    const foundUserId = await foundUser.id;

    if (hashedPassword !== foundUser.hashedPassword) {
      enqueueSnackbar("Nieprawidłowe hasło");
      throw new Error("wrong password");
    }

    localStorage.setItem("loggedUser", userName);
    localStorage.setItem("loggedUserId", foundUserId);
    localStorage.setItem("loggedUserHashedPassword", hashedPassword);
    setLoggedUser(userName);
    setLoggedUserId(foundUserId);
    return foundUserId;
  } catch (error) {
    console.error(`${error}`);
    return -1;
  }
};

export default loginUser;
