import { useState, useEffect } from "react";

const JSON_SERVER_URL = "http://localhost:3000/users";

const useFetchArena = (SERVER_URL, userId) => {
  const [leftPokemon, setLeftPokemon] = useState({});
  const [rightPokemon, setRightPokemon] = useState({});

  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/${userId}`);
        if (!response) throw new Error("Problem with fetching arena");

        const jsonResponse = await response.json();
        const { left, right } = jsonResponse.arena;
        setLeftPokemon(left);
        setRightPokemon(right);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchArenaData();
  }, []);

  return { leftPokemon, rightPokemon };
};

export default useFetchArena;
