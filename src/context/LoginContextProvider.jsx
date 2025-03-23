import LoginContext from "./LoginContext";
import { useState } from "react"

const LoginContextProvider = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState(null)
    const [loggedUserId, setLoggedUserId] = useState(-1)

    return (
        <LoginContext.Provider
            value={{ loggedUser, setLoggedUser, loggedUserId, setLoggedUserId }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider