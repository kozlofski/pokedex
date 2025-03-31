import { useEffect } from "react";
import { useState } from "react";

import fetchSinglePokemon from "../services/fetchSinglePokemon";

const useFetchSinglePokemon = (pokemonInitial) => {
  const [pokemon, setPokemon] = useState({});
  // console.log("fetching", pokemonInitial);

  useEffect(() => {
    (async () => {
      let newPokemon = await fetchSinglePokemon(pokemonInitial.url);

      if (pokemonInitial.wins !== undefined) {
        newPokemon = {
          ...newPokemon,
          wins: pokemonInitial.wins,
          losses: pokemonInitial.losses,
          baseExperience: pokemonInitial.baseExperience,
        };
      }
      // console.log(newPokemon);
      setPokemon(newPokemon);
    })();
  }, [pokemonInitial]);

  return pokemon;
};
export default useFetchSinglePokemon;
