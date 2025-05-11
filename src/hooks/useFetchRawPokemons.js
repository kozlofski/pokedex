import { useState, useEffect, useContext } from "react";

import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import fetchUserData from "../services/fetchUserData";
import filterFavourites from "../services/filterFavourites";
import mergeWithUserPokemons from "../services/mergeWithUserPokemons";
import LoginContext from "../context/LoginContext";
import { LIMIT } from "../constants";

const useFetchRawPokemons = (start = 0, limit = LIMIT, favourites) => {
  const { loggedUserId } = useContext(LoginContext);
  const [rawPokemons, setRawPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsPending(true);
        let linksToPokemons = await fetchLinksToPokemons(start, limit);
        const userData = await fetchUserData(loggedUserId);

        if (loggedUserId !== "-1") {
          linksToPokemons = await mergeWithUserPokemons(
            linksToPokemons,
            loggedUserId,
            userData
          );
        }

        if (favourites)
          linksToPokemons = await filterFavourites(
            linksToPokemons,
            loggedUserId
          );

        setRawPokemons(linksToPokemons);
        setUserData(userData);
        setIsPending(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [start, limit, favourites, loggedUserId]);

  return { rawPokemons, isPending, userData };
};

export default useFetchRawPokemons;
