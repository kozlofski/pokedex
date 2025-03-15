import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 10;

const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState([]);

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
            base_experience,
            height,
            weight,
            abilities: {
              0: {
                ability: { name: abil },
              },
            },
          } = jsonResponse;

          console.log(`pokemon: `, name, base_experience, height, weight, abil);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPokemon();
    });
  }, [pokemons]);

  return { pokemons: pokemons };
};

export default useFetchPokemons;
