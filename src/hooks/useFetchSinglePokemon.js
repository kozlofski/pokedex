import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import updatePokemonWithUserData from "../services/updatePokemonWithUserData";

const useFetchSinglePokemon = (inputPokemonData, userData) => {
  const [pokemon, setPokemon] = useState({});
  const { loggedUserId } = useContext(LoginContext);

  useEffect(() => {
    (async () => {
      try {
        let newPokemon;
        if (
          !("url" in inputPokemonData) ||
          inputPokemonData.url === undefined
        ) {
          const createdPokemonData = userData.created[inputPokemonData.name];
          newPokemon = { ...createdPokemonData, name: inputPokemonData.name };
        } else newPokemon = await fetchSinglePokemon(inputPokemonData.url);

        newPokemon.url = inputPokemonData.url;

        if (loggedUserId !== "-1")
          newPokemon = await updatePokemonWithUserData(newPokemon, userData);

        setPokemon(newPokemon);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [inputPokemonData, loggedUserId, userData]);

  return pokemon;
};
export default useFetchSinglePokemon;
