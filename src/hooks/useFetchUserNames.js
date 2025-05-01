import { useState, useEffect } from "react";
import { JSON_SERVER_URL } from "../constants";

const useFetchUserNames = () => {
  const [userNamesTaken, setUserNamesTaken] = useState([]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const response = await fetch(JSON_SERVER_URL);
      const jsonResponse = await response.json();
      const users = jsonResponse.reduce((outputObj, userData) => {
        outputObj[userData.userName] = true;
        return outputObj;
      }, {});
      console.log("Users fetched: ", users);
      setUserNamesTaken(users);
    };
    fetchUserNames();
  }, []);

  return userNamesTaken;
};

export default useFetchUserNames;
