const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchLinksToPokemons = async (start, limit) => {
  const startQueryParam = start > 0 ? `offset=${start}&` : "";

  try {
    const response = await fetch(
      `${BASE_URL}pokemon?${startQueryParam}limit=${limit}`
    );
    if (!response) throw new Error("fetching pokemons links went bad");
    const jsonResponse = await response.json();
    const linksToPokemons = await jsonResponse.results;

    return linksToPokemons;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchLinksToPokemons;
