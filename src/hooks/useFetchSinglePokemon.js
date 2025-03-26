import { useEffect } from "react";
import { useState } from "react";

import fetchSinglePokemon from "../services/fetchSinglePokemon";

const useFetchSinglePokemon = (url) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    (async () => {
      const newPokemon = await fetchSinglePokemon(url);
      setPokemon(newPokemon);
    })();
  }, [url]);

  return pokemon;
};
export default useFetchSinglePokemon;
