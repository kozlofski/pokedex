import fetchUserData from "./fetchUserData";

const mergeWithUserData = async (linksToPokemons, serverUrl, loggedUserId) => {
  const userData = await fetchUserData(serverUrl, loggedUserId);

  const mergedPokemons = linksToPokemons.map((pokemon) => {
    if (pokemon.name in userData.stats) {
      const modifiedPokemon = {
        ...pokemon,
        wins: userData.stats[pokemon.name].wins,
        losses: userData.stats[pokemon.name].losses,
        baseExperience: userData.stats[pokemon.name].baseExperience,
      };
      return modifiedPokemon;
    } else return pokemon;
  });
  return mergedPokemons;
};

export default mergeWithUserData;
