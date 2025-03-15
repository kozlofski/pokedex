import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 10;

const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        setPokemons(jsonResponse.results);
        console.log(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const pokemonData = [];

    pokemons.forEach(({ url }) => {
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
          setPokemonData([...pokemonData, { name, height, weight }]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPokemon();
    });
  }, [pokemons]);

  return { pokemons: pokemonData };
};

export default useFetchPokemons;
