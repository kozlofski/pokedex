import { useState, useEffect } from "react";
import { JSON_SERVER_URL } from "../constants";

const useFetchArena = (userId) => {
  const [leftPokemonFromArena, setLeftPokemonFromArena] = useState(undefined);
  const [rightPokemonFromArena, setRightPokemonFromArena] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        if (userId === "-1") return;

        const response = await fetch(`${JSON_SERVER_URL}/${userId}`);
        if (!response) throw new Error("Error during fetching arena");

        const jsonResponse = await response.json();
        const { leftPokemon: left, rightPokemon: right } =
          await jsonResponse.arena;
        setLeftPokemonFromArena(left);
        setRightPokemonFromArena(right);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userId]);

  return { leftPokemonFromArena, rightPokemonFromArena };
};

export default useFetchArena;
