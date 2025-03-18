import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const useFetchPokemons = () => {
  console.log("Use fetch pokemons started");

  const [pokemons, setPokemons] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        const linksToPokemons = await jsonResponse.results;
        const pokemonsArray = [];

        linksToPokemons.forEach(({ url }) => {
          const fetchPokemons = async () => {
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

              pokemonsArray.push(newPokemon);
            } catch (error) {
              console.log(error);
            }
          };

          fetchPokemons();
        });

        console.log("Pokemons array after foreach: ", pokemonsArray);
        setPokemons(pokemonsArray);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return { pokemons, isPending };
};

export default useFetchPokemons;
