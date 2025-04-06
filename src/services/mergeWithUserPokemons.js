import fetchUserData from "./fetchUserData";

const mergeWithUserPokemons = async (linksToPokemons, loggedUserId) => {
  const userData = await fetchUserData(loggedUserId);
  const pokemonEntries = Object.entries(userData.created);
  console.log("Userdata created: ", pokemonEntries);

  const userPokemons = pokemonEntries.map((entry) => {
    return {
      name: entry[0],
      baseExperience: parseInt(entry[1].baseExperience),
      height: parseInt(entry[1].height),
      weight: parseInt(entry[1].weight),
      ability: entry[1].ability,
      imgUrl: entry[1].imgUrl,
    };
  });
  console.log("User pokemons: ", userPokemons);

  return [...linksToPokemons, ...userPokemons];
};

export default mergeWithUserPokemons;
