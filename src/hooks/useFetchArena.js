import { useState, useEffect } from "react";
import { JSON_SERVER_URL } from "../constants";
import fetchUserData from "../services/fetchUserData";

const useFetchArena = (userId) => {
  const [leftPokemonFromArena, setLeftPokemonFromArena] = useState(undefined);
  const [rightPokemonFromArena, setRightPokemonFromArena] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        if (userId === "-1") return;

        const userData = await fetchUserData(userId);
        // const response = await fetch(`${JSON_SERVER_URL}/${userId}`);
        // if (!response) throw new Error("Error during fetching arena");

        // const jsonResponse = await response.json();
        const { leftPokemon: left, rightPokemon: right } = userData.arena;
        setLeftPokemonFromArena(left);
        setRightPokemonFromArena(right);
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userId]);

  return { leftPokemonFromArena, rightPokemonFromArena, userData };
};

export default useFetchArena;
