import { useEffect } from "react";
import { useState } from "react";

import fetchSinglePokemon from "../services/fetchSinglePokemon";

const useFetchSinglePokemon = (pokemonInitial) => {
  const [pokemon, setPokemon] = useState({});

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

      setPokemon(newPokemon);
    })();
  }, [pokemonInitial.url]);

  return pokemon;
};
export default useFetchSinglePokemon;
