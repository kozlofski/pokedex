import { useState, useEffect, useContext } from "react";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import { LIMIT } from "../constants";
import LoginContext from "../context/LoginContext";
import fetchUserData from "../services/fetchUserData";

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

        if (favourites) {
          try {
            const userDataResponse = await fetchUserData(loggedUserId);
            if (!userDataResponse)
              throw new Error("Error fetching user data from JSON server");
            const filterFavourites = (pokemon) =>
              pokemon.name in userDataResponse.favourites;
            linksToPokemons = linksToPokemons.filter(filterFavourites);
          } catch (error) {
            console.log(
              "Error in filtering favourites in useFetchPokemons: ",
              error
            );
          }
        }

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
