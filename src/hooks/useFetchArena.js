import { useState, useEffect } from "react";

const JSON_SERVER_URL = "http://localhost:3000/users";

const useFetchArena = (SERVER_URL, userId) => {
  const [leftPokemonFromArena, setLeftPokemonFromArena] = useState(undefined);
  const [rightPokemonFromArena, setRightPokemonFromArena] = useState(undefined);

  useEffect(() => {
    console.log(`Fetching arena for user ${userId} from ${SERVER_URL}`);
    const fetchArenaData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/${userId}`);
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
