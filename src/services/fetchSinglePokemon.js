const fetchSinglePokemon = async (url) => {
  try {
    const response = await fetch(url);
    if (!response)
      throw new Error("problem fetching pokemon in fetchSinglePokemon.js");

    const jsonResponse = await response.json();
    const {
      name,
      base_experience: baseExperience,
      height,
      weight,
      abilities: {
        0: {
          ability: { name: ability },
        },
      },
      sprites: {
        other: {
          "official-artwork": { front_shiny: imgUrl },
        },
      },
    } = await jsonResponse;

    const newPokemon = {
      name,
      baseExperience,
      height,
      weight,
      ability,
      imgUrl,
    };
    return newPokemon;
  } catch (error) {
    console.error(error);
  }
};

export default fetchSinglePokemon;
