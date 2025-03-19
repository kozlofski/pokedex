import { useState, useEffect } from "react";

// custom hook fetching list of pokemons from API
// - only Pokemon's name and link
// to further details - these are downloaded
// by another hook form inside Pokemon's card

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const useFetchPokemons = () => {
  console.log("Use fetch pokemons started");

  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        const linksToPokemons = await jsonResponse.results;
        setPokemons(linksToPokemons);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { pokemons, isPending };
};

export default useFetchPokemons;
