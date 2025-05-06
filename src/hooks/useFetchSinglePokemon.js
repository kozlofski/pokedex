import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import updatePokemonWithUserData from "../services/updatePokemonWithUserData";
import fetchUserData from "../services/fetchUserData";

const useFetchSinglePokemon = (inputPokemonData) => {
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
          const userData = await fetchUserData(loggedUserId);
          const createdPokemonData = userData.created[inputPokemonData.name];
          newPokemon = { ...createdPokemonData, name: inputPokemonData.name };
        } else newPokemon = await fetchSinglePokemon(inputPokemonData.url);

        newPokemon.url = inputPokemonData.url;

        if (loggedUserId !== "-1")
          newPokemon = await updatePokemonWithUserData(
            newPokemon,
            loggedUserId
          );

        setPokemon(newPokemon);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [inputPokemonData, loggedUserId]);

  return pokemon;
};
export default useFetchSinglePokemon;
