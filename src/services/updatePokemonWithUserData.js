import fetchUserData from "./fetchUserData";

const updatePokemonWithUserData = async (inputPokemon, loggedUserId) => {
  let outputPokemon = { ...inputPokemon };
  const userData = await fetchUserData(loggedUserId);

  if (inputPokemon.name in userData.modified) {
    outputPokemon = {
      ...inputPokemon,
      height: userData.modified[inputPokemon.name].height,
      weight: userData.modified[inputPokemon.name].weight,
      baseExperience: userData.modified[inputPokemon.name].baseExperience,
    };
  }

  if (inputPokemon.name in userData.stats) {
    outputPokemon = {
      ...inputPokemon,
      wins: userData.stats[inputPokemon.name].wins,
      losses: userData.stats[inputPokemon.name].losses,
      baseExperience: userData.stats[inputPokemon.name].baseExperience,
    };
  }
  return outputPokemon;
};

export default updatePokemonWithUserData;
