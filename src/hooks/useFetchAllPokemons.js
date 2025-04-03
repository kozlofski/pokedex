import { useState, useEffect, useContext } from "react";

import LoginContext from "../context/LoginContext";
import mergeWithUserData from "../services/mergeWithUserData";
import fetchSinglePokemon from "../services/fetchSinglePokemon";
import { API_URL, LIMIT } from "../constants";

const useFetchAllPokemons = () => {
  const { loggedUserId } = useContext(LoginContext);

  const [completePokemons, setCompletePokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const fetchLinksToPokemons = () => {
      fetch(`${API_URL}pokemon?limit=${LIMIT}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          fetchPokemonsDetails(jsonResponse.results);
        })
        .catch((error) => console.log(error));
    };
    fetchLinksToPokemons();

    const fetchPokemonsDetails = (linksToPokemons) => {
      const pokemonFetchPromises = linksToPokemons.map((pokemon) =>
        fetchSinglePokemon(pokemon.url)
      );

      Promise.all(pokemonFetchPromises)
        .then((fetchedPokemonsWithDetails) =>
          mergeWithUserData(fetchedPokemonsWithDetails, loggedUserId)
        )
        .then((pokemonsWithDetailsMergedWithUserData) =>
          setCompletePokemons([...pokemonsWithDetailsMergedWithUserData])
        )
        .catch((error) => console.log(error))
        .finally(setIsPending(false));
    };
  }, [loggedUserId]);

  return { completePokemons, isPending };
};

export default useFetchAllPokemons;
