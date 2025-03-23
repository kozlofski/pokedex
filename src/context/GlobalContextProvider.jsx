import GlobalContext from "./GlobalContext";
// import { useState } from "react";

const GlobalContextProvider = ({ children }) => {

    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider