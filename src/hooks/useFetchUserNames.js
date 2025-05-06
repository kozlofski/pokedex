import { useState, useEffect } from "react";
import { JSON_SERVER_URL } from "../constants";

const useFetchUserNames = () => {
  const [userNamesTaken, setUserNamesTaken] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(JSON_SERVER_URL);
        const jsonResponse = await response.json();
        const users = jsonResponse.reduce((outputObj, userData) => {
          outputObj[userData.userName] = true;
          return outputObj;
        }, {});
        setUserNamesTaken(users);
      } catch (error) {
        console.error("Error in useFetchUserNames:", error);
      }
    })();
  }, []);

  return userNamesTaken;
};

export default useFetchUserNames;
