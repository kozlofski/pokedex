import GlobalContext from "./GlobalContext";
import { useState } from "react";

const GlobalContextProvider = ({ children }) => {

    const [arena, setArena] = useState([])

    return (
        <GlobalContext.Provider value={{ arena, setArena }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider