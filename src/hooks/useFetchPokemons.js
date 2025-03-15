import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/";

const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}pokemon?limit=150`);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return pokemons;
};

export default useFetchPokemons;
