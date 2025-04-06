import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import { API_URL, LIMIT } from "../constants";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import mergeWithUserPokemons from "../services/mergeWithUserPokemons";

import updatePokemonWithUserData from "../services/updatePokemonWithUserData";

const useFetchAllPokemons = () => {
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
        async (pokemonInitial) => {
          let newPokemon;
          if (pokemonInitial.url === undefined)
            newPokemon = { ...pokemonInitial };
          else newPokemon = await fetchSinglePokemon(pokemonInitial.url);

          newPokemon = await updatePokemonWithUserData(
            newPokemon,
            loggedUserId
          );
          return newPokemon;
        }
      );
      Promise.all(pokemonFetchPromises)
        .then((pokemons) => setCompletePokemons([...pokemons]))
        .catch((error) => console.log(error));
    })();

    setIsPending(false);
  }, [loggedUserId]);

  return { completePokemons, isPending };
};

export default useFetchAllPokemons;
