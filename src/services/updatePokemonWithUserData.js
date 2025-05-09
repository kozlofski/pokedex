// import fetchUserData from "./fetchUserData";

const updatePokemonWithUserData = async (
  inputPokemon,
  // loggedUserId,
  userData
) => {
  try {
    let outputPokemon = { ...inputPokemon };
    // const userData = await fetchUserData(loggedUserId);

    if (inputPokemon.name in userData.modified) {
      outputPokemon = {
        ...outputPokemon,
        height: userData.modified[inputPokemon.name].height,
        weight: userData.modified[inputPokemon.name].weight,
        baseExperience: userData.modified[inputPokemon.name].baseExperience,
      };
    }

    if (inputPokemon.name in userData.stats) {
      outputPokemon = {
        ...outputPokemon,
        wins: userData.stats[inputPokemon.name].wins,
        losses: userData.stats[inputPokemon.name].losses,
        baseExperience: userData.stats[inputPokemon.name].baseExperience,
      };
    }
    return outputPokemon;
  } catch (error) {
    console.error(error);
  }
};

export default updatePokemonWithUserData;
