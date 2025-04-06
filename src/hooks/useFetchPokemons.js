import { useState, useEffect, useContext } from "react";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import { LIMIT } from "../constants";
import LoginContext from "../context/LoginContext";
import filterFavourites from "../services/filterFavourites";

const useFetchPokemons = (start = 0, limit = LIMIT, favourites) => {
  const { loggedUserId } = useContext(LoginContext);

  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // this can be separate service
    (async () => {
      try {
        setIsPending(true);
        let linksToPokemons = await fetchLinksToPokemons(start, limit);

        if (favourites)
          linksToPokemons = await filterFavourites(
            linksToPokemons,
            loggedUserId
          );

        setPokemons(linksToPokemons);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [start, limit, favourites, loggedUserId]);

  return { pokemons, isPending };
};

export default useFetchPokemons;
