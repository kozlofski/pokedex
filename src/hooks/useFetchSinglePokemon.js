import { useState, useEffect, useContext } from "react";
import LoginContext from "../context/LoginContext";

import fetchSinglePokemon from "../services/fetchSinglePokemon";
import fetchUserData from "../services/fetchUserData";

const useFetchSinglePokemon = (pokemonInitial) => {
  const [pokemon, setPokemon] = useState({});
  const { loggedUserId } = useContext(LoginContext);
  console.log("fetching", pokemonInitial);

  useEffect(() => {
    (async () => {
      let newPokemon = {};
      if (pokemonInitial.url !== undefined) {
        newPokemon = await fetchSinglePokemon(pokemonInitial.url);
      } else {
        newPokemon = { ...pokemonInitial };
      }

      const userData = await fetchUserData(loggedUserId);

      if (pokemonInitial.name in userData.modified) {
        newPokemon = {
          ...newPokemon,
          height: userData.modified[pokemonInitial.name].height,
          weight: userData.modified[pokemonInitial.name].weight,
          baseExperience: userData.modified[pokemonInitial.name].baseExperience,
        };
      }

      if (pokemonInitial.name in userData.stats) {
        newPokemon = {
          ...newPokemon,
          wins: userData.stats[pokemonInitial.name].wins,
          losses: userData.stats[pokemonInitial.name].losses,
          baseExperience: userData.stats[pokemonInitial.name].baseExperience,
        };
      }

      console.log(newPokemon);
      setPokemon(newPokemon);
    })();
  }, [pokemonInitial, loggedUserId]);

  return pokemon;
};
export default useFetchSinglePokemon;
