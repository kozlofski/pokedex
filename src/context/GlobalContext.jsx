import { useState, createContext } from "react";
import useFetchPokemons from "../hooks/useFetchPokemons";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const pageLimit = 15;
  const { pokemons } = useFetchPokemons();
  const [currentPage, setCurrentPage] = useState(1)
  console.log("From context: ", pokemons)

  return (
    <GlobalContext.Provider value={{ pokemons, currentPage, setCurrentPage, pageLimit }}>
      {children}
    </GlobalContext.Provider>
  );
};
