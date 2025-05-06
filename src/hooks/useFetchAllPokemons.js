import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import { LIMIT } from "../constants";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import fetchUserData from "../services/fetchUserData";
import mergeWithUserPokemons from "../services/mergeWithUserPokemons";

import updatePokemonWithUserData from "../services/updatePokemonWithUserData";

const useFetchAllPokemons = (setSortedPokemons) => {
  const { loggedUserId } = useContext(LoginContext);
  const [completePokemons, setCompletePokemons] = useState([]);
  const [isPending, setIsPending] = useState();

  useEffect(() => {
    setIsPending(true);

    (async () => {
      let linksToPokemons = await fetchLinksToPokemons(0, LIMIT);

      linksToPokemons = await mergeWithUserPokemons(
        linksToPokemons,
        loggedUserId
      );

      const pokemonFetchPromises = linksToPokemons.map(
        async (inputPokemonData) => {
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
          newPokemon = await updatePokemonWithUserData(
            newPokemon,
            loggedUserId
          );
          return newPokemon;
        }
      );

      Promise.all(pokemonFetchPromises)
        .then((pokemons) => {
          setCompletePokemons([...pokemons]);
          setSortedPokemons(pokemons);
        })
        .then(() => setIsPending(false))
        .catch((error) => console.error(error));
    })();
  }, [loggedUserId]);

  return { completePokemons, isPending };
};

export default useFetchAllPokemons;
