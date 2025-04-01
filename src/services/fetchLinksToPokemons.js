const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT = 150;

const fetchLinksToPokemons = async () => {
  try {
    const response = await fetch(`${BASE_URL}pokemon?limit=${LIMIT}`);
    if (!response) throw new Error("fetching pokemons links went bad");
    const jsonResponse = await response.json();
    const linksToPokemons = await jsonResponse.results;
    return linksToPokemons;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchLinksToPokemons;
