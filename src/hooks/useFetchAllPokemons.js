import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import fetchUserData from "../services/fetchUserData";
import mergeWithUserPokemons from "../services/mergeWithUserPokemons";
import updatePokemonWithUserData from "../services/updatePokemonWithUserData";
import { LIMIT } from "../constants";

const useFetchAllPokemons = (setSortedPokemons) => {
  const { loggedUserId } = useContext(LoginContext);
  const [completePokemons, setCompletePokemons] = useState([]);
  const [isPending, setIsPending] = useState();

  useEffect(() => {
    setIsPending(true);

    (async () => {
      try {
        let linksToPokemons = await fetchLinksToPokemons(0, LIMIT);

        linksToPokemons = await mergeWithUserPokemons(
          linksToPokemons,
          loggedUserId
        );

        const pokemonFetchPromises = linksToPokemons.map(
          async (inputPokemonData) => {
            try {
              let newPokemon;

              if (
                !("url" in inputPokemonData) ||
                inputPokemonData.url === undefined
              ) {
                const userData = await fetchUserData(loggedUserId);
                const createdPokemonData =
                  userData.created[inputPokemonData.name];
                newPokemon = {
                  ...createdPokemonData,
                  name: inputPokemonData.name,
                };
              } else
                newPokemon = await fetchSinglePokemon(inputPokemonData.url);

              newPokemon.url = inputPokemonData.url;
              newPokemon = await updatePokemonWithUserData(
                newPokemon,
                loggedUserId
              );
              return newPokemon;
            } catch (error) {
              console.error(
                "Error in fetching single pokemon in useFetchAllPokemons: ",
                error
              );
            }
          }
        );

        Promise.all(pokemonFetchPromises)
          .then((pokemons) => {
            setCompletePokemons([...pokemons]);
            setSortedPokemons(pokemons);
          })
          .then(() => setIsPending(false))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(
          "Error fetching all pokemons in useFetchAllPokemons",
          error
        );
      }
    })();
  }, [loggedUserId]);

  return { completePokemons, isPending };
};

export default useFetchAllPokemons;
