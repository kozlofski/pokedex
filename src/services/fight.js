const fight = async (leftPokemon, rightPokemon) => {
  console.log("Fight!", leftPokemon, rightPokemon);

  const fetchPokemon = async (url) => {
    try {
      const response = await fetch(url);
      if (!response) throw new Error("problem fetching in fight");
      const jsonResponse = await response.json();
      const {
        name,
        base_experience: baseExperience,
        weight,
      } = await jsonResponse;
      console.log(weight, baseExperience);
      return { name: name, baseExperience: baseExperience, weight: weight };
    } catch (error) {
      console.log(error);
    }
  };

  const pokemonData = fetchPokemon(leftPokemon.url);
  console.log(pokemonData);
};

export default fight;
