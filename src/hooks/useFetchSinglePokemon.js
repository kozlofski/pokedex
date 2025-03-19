import { useEffect } from "react";
import { useState } from "react";

const useFetchSinglePokemon = (url) => {
  console.log("Fetching pokemon from :", url);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchSinglePokemon = async () => {
      try {
        const response = await fetch(url);
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
        setPokemon(newPokemon);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSinglePokemon();
  }, [url]);

  return pokemon;
};
export default useFetchSinglePokemon;
