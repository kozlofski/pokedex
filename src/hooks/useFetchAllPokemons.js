import { useState, useEffect } from "react";
import mergeWithUserData from "../services/mergeWithUserData";
import fetchSinglePokemon from "../services/fetchSinglePokemon";

// const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const useFetchAllPokemons = (apiUrl, jsonServerUrl, loggedUserId) => {
  const [completePokemons, setCompletePokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const fetchLinksToPokemons = () => {
      // setIsPending(true);
      fetch(`${apiUrl}pokemon?limit=${LIMIT}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          fetchPokemonsDetails(jsonResponse.results);
        })
        .catch((error) => console.log(error));
    };
    fetchLinksToPokemons();

    const fetchPokemonsDetails = (linksToPokemons) => {
      // console.log("Inside second fetch: ", linksToPokemons);
      const pokemonFetchPromises = linksToPokemons.map((pokemon) =>
        fetchSinglePokemon(pokemon.url)
      );

      // const completePokemons = [];
      Promise.all(pokemonFetchPromises)
        .then((fetchedPokemonsWithDetails) =>
          mergeWithUserData(
            fetchedPokemonsWithDetails,
            jsonServerUrl,
            loggedUserId
          )
        )
        .then((pokemonsWithDetailsMergedWithUserData) =>
          setCompletePokemons([...pokemonsWithDetailsMergedWithUserData])
        )
        .catch((error) => console.log(error))
        .finally(setIsPending(false));
    };
  }, []);

  return { completePokemons, isPending };
};

export default useFetchAllPokemons;
