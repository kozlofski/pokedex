import { useState, useEffect } from "react";

// this hook will be loaded from <App /> and pokemons' data written to global context

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 10;

const useFetchPokemons = () => {
  // const [linksToPokemons, setLinksToPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        const linksToPokemons = jsonResponse.results;
        console.log("Links to pokemons: ", linksToPokemons);

        linksToPokemons.forEach(({ url }) => {
          const fetchPokemon = async () => {
            // const newPokemon = {};
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
              } = jsonResponse;

              console.log(
                `pokemon: `,
                name,
                baseExperience,
                height,
                weight,
                ability
              );
              return { name, height, weight };
            } catch (error) {
              console.log(error);
            }
          };

          fetchPokemon();
        });

        // console.log("Pokemons array: ", pokemonsArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Second use effect: ", pokemonData);
  }, [pokemonData]);

  return { pokemons: pokemonData };
};

export default useFetchPokemons;
