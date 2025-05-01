import { useState, useEffect, useContext } from "react";

import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import filterFavourites from "../services/filterFavourites";
import mergeWithUserPokemons from "../services/mergeWithUserPokemons";
import LoginContext from "../context/LoginContext";
import { LIMIT } from "../constants";

const useFetchRawPokemons = (start = 0, limit = LIMIT, favourites) => {
  const { loggedUserId } = useContext(LoginContext);
  const [rawPokemons, setRawPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsPending(true);
        let linksToPokemons = await fetchLinksToPokemons(start, limit);

        if (loggedUserId !== "-1") {
          linksToPokemons = await mergeWithUserPokemons(
            linksToPokemons,
            loggedUserId
          );
        }

        if (favourites)
          linksToPokemons = await filterFavourites(
            linksToPokemons,
            loggedUserId
          );

        setRawPokemons(linksToPokemons);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [start, limit, favourites, loggedUserId]);

  return { rawPokemons, isPending };
};

export default useFetchRawPokemons;
