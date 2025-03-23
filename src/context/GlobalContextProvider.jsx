import GlobalContext from "./GlobalContext";
// import { useState } from "react";

const GlobalContextProvider = ({ children }) => {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider