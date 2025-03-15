import { useState, useEffect } from "react";

// this hook will be loaded from <App /> and pokemons' data written to global context

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 10;

const useFetchPokemons = () => {
  const [linksToPokemons, setLinksToPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        console.log("Links to pokemons: ", jsonResponse.results);
        setLinksToPokemons(jsonResponse.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // const pokemonsFetched = [];
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
          // pokemonsFetched.push({ name, height, weight });
          setPokemonData([...pokemonData, { name, height, weight }]);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPokemon();
    });

    // console.log("Pokemons fetched: ", pokemonsFetched);
    // setPokemonData(pokemonsFetched);
  }, [linksToPokemons]);

  return { pokemons: pokemonData };
};

export default useFetchPokemons;
