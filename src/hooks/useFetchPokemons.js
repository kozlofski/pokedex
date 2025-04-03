import { useState, useEffect, useContext } from "react";
import mergeWithUserData from "./../services/mergeWithUserData";
import fetchLinksToPokemons from "../services/fetchLinksToPokemons";
import { JSON_SERVER_URL } from "../constants";
import LoginContext from "../context/LoginContext";

// custom hook fetching list of pokemons from API
// - only Pokemon's name and link
// to further details - these are downloaded
// by another hook form inside Pokemon's card

const useFetchPokemons = () => {
  const { loggedUserId } = useContext(LoginContext);

  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // this can be separate service
    const fetchData = async () => {
      try {
        setIsPending(true);
        const linksToPokemons = await fetchLinksToPokemons();
        if (loggedUserId === "-1") setPokemons(linksToPokemons);
        else {
          const mergedLinksToPokemons = await mergeWithUserData(
            linksToPokemons,
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
  }, [loggedUserId]);
  // why this is necessary? Because it is provided by the hook?

  return { pokemons, isPending };
};

export default useFetchPokemons;
