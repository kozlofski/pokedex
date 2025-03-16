import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

// this hook should be fired from GlobalContext

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const useFetchPokemons = () => {
  console.log("Use fetch pokemons started");

  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFetched, setPokemonsFetched] = useState(0);
  // const { setPageLimit } = useContext(GlobalContext);
  // setPageLimit(Math.floor(LIMIT / 15));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
        const jsonResponse = await response.json();
        const linksToPokemons = jsonResponse.results;
        // console.log("Links to pokemons: ", linksToPokemons);

        const pokemonsArray = [];

        linksToPokemons.forEach(({ url }) => {
          const fetchPokemon = async () => {
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
              } = jsonResponse;

              const newPokemon = {
                name,
                baseExperience,
                height,
                weight,
                ability,
                imgUrl,
              };

              // console.log(`pokemon: `, newPokemon);
              // console.log("Pokemon array at this iteration: ", pokemonsArray);
              pokemonsArray.push(newPokemon);
            } catch (error) {
              console.log(error);
            }
          };

          fetchPokemon();
        });

        console.log("Pokemons array after foreach: ", pokemonsArray);
        setPokemons(pokemonsArray);
        setPokemonsFetched(pokemonsArray.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return { pokemons, pokemonsFetched };
  // maybe delete pokemonsFetched property
};

export default useFetchPokemons;
