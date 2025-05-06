import fetchUserData from "./fetchUserData";

const mergeWithUserData = async (linksToPokemons, loggedUserId) => {
  try {
    const userData = await fetchUserData(loggedUserId);
    const mergedPokemons = linksToPokemons.map((pokemon) => {
      let modifiedPokemon = { ...pokemon };
      if (pokemon.name in userData.modified) {
        modifiedPokemon = {
          ...modifiedPokemon,
          height: userData.modified[pokemon.name].height,
          weight: userData.modified[pokemon.name].weight,
          baseExperience: userData.modified[pokemon.name].baseExperience,
        };
      }
      if (pokemon.name in userData.stats) {
        modifiedPokemon = {
          ...modifiedPokemon,
          wins: userData.stats[pokemon.name].wins,
          losses: userData.stats[pokemon.name].losses,
          baseExperience: userData.stats[pokemon.name].baseExperience,
        };
      }
      return modifiedPokemon;
    });
    return mergedPokemons;
  } catch (error) {
    console.error("Fetch user data problem: ", error);
  }
};

export default mergeWithUserData;
