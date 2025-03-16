import { createContext, useState } from "react";
import useFetchPokemons from "../hooks/useFetchPokemons";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { pokemons } = useFetchPokemons();
  console.log("From context: ", pokemons)

  return (
    <GlobalContext.Provider value={{ pokemons }}>
      {/* <GlobalContext.Provider > */}
      {children}
    </GlobalContext.Provider>
  );
};
