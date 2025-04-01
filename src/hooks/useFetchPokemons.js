import { useState, useEffect } from "react";
import mergeWithUserData from "./../services/mergeWithUserData";

// custom hook fetching list of pokemons from API
// - only Pokemon's name and link
// to further details - these are downloaded
// by another hook form inside Pokemon's card

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const useFetchPokemons = (serverUrl, loggedUserId) => {
  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // this can be separate service
    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        const linksToPokemons = await jsonResponse.results;
        if (loggedUserId === "-1") setPokemons(linksToPokemons);
        else {
          const mergedLinksToPokemons = await mergeWithUserData(
            linksToPokemons,
            serverUrl,
            loggedUserId
          );
          setPokemons(mergedLinksToPokemons);
        }
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
