import { useState, useEffect, useContext } from "react";
import LoginContext from "../context/LoginContext";

import fetchSinglePokemon from "../services/fetchSinglePokemon";
import updatePokemonWithUserData from "../services/updatePokemonWithUserData";

const useFetchSinglePokemon = (pokemonInitial) => {
  const [pokemon, setPokemon] = useState({});
  const { loggedUserId } = useContext(LoginContext);
  // console.log("fetching", pokemonInitial);

  useEffect(() => {
    (async () => {
      let newPokemon;
      if (pokemonInitial.url === undefined) newPokemon = { ...pokemonInitial };
      else newPokemon = await fetchSinglePokemon(pokemonInitial.url);

      newPokemon = await updatePokemonWithUserData(newPokemon, loggedUserId);
      setPokemon(newPokemon);
    })();
  }, [pokemonInitial, loggedUserId]);

  return pokemon;
};
export default useFetchSinglePokemon;
