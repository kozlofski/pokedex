import LoginContext from "./LoginContext";
import { useState } from "react"

const LoginContextProvider = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState(null)

    return (
        <LoginContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider