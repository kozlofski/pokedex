// import fetchUserData from "./fetchUserData";

const mergeWithUserPokemons = async (
  linksToPokemons,
  loggedUserId,
  userData
) => {
  if (loggedUserId === "-1") return linksToPokemons;

  // const userData = await fetchUserData(loggedUserId);
  const createdPokemonsNames = Object.keys(userData.created);

  const userPokemons = createdPokemonsNames.map((name) => {
    return {
      name: name,
    };
  });

  return [...linksToPokemons, ...userPokemons];
};

export default mergeWithUserPokemons;
