const fetchSinglePokemon = async (url) => {
  console.log("Url: ", url);
  try {
    const response = await fetch(url);
    if (!response) throw new Error("problem fetching pokemon");
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
    console.log("New pokemon inside fetchSingle... servce: ", newPokemon);
    return newPokemon;
  } catch (error) {
    console.log(error);
  }
};

export default fetchSinglePokemon;
