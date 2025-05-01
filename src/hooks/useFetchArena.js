import { useState, useEffect } from "react";
import { JSON_SERVER_URL } from "../constants";

const useFetchArena = (userId) => {
  const [leftPokemonFromArena, setLeftPokemonFromArena] = useState(undefined);
  const [rightPokemonFromArena, setRightPokemonFromArena] = useState(undefined);

  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        // fetchUserData
        const response = await fetch(`${JSON_SERVER_URL}/${userId}`);
        if (!response) throw new Error("Problem with fetching arena");

        const jsonResponse = await response.json();
        const { leftPokemon: left, rightPokemon: right } =
          await jsonResponse.arena;
        setLeftPokemonFromArena(left);
        setRightPokemonFromArena(right);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchArenaData(); // change to iife
  }, []);

  return { leftPokemonFromArena, rightPokemonFromArena };
};

export default useFetchArena;
