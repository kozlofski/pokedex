import { createContext } from "react";
import useFetchPokemons from "../hooks/useFetchPokemons";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { pokemons } = useFetchPokemons();
  // useFetchPokemons();
  console.log("From context file: ", pokemons)

  return (
    <GlobalContext.Provider value={{ pokemonData: [] }}>
      {/* <GlobalContext.Provider > */}
      {children}
    </GlobalContext.Provider>
  );
};
