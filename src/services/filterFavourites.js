import fetchUserData from "./fetchUserData";

const filterFavourites = async (inputPokemons, loggedUserId) => {
  try {
    const userDataResponse = await fetchUserData(loggedUserId);
    if (!userDataResponse)
      throw new Error("Error fetching user data from JSON server");
    const favouritesFilter = (pokemon) =>
      pokemon.name in userDataResponse.favourites;
    const favouritePokemons = inputPokemons.filter(favouritesFilter);
    return favouritePokemons;
  } catch (error) {
    console.log("Error in filtering favourites in useFetchPokemons: ", error);
  }
};

export default filterFavourites;
