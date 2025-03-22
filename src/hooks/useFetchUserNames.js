import React from "react";
import { useState, useEffect } from "react";

const JSON_SERVER_URL = "http://localhost:3000/users";

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
