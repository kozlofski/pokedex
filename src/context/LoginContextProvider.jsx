import LoginContext from "./LoginContext";
import { useState } from "react"

const LoginContextProvider = ({ children }) => {

    const userName = localStorage.getItem("loggedUser") ?? null
    const id = localStorage.getItem("loggedUserId") ?? -1
    const [loggedUser, setLoggedUser] = useState(userName)
    const [loggedUserId, setLoggedUserId] = useState(id)

    return (
        <LoginContext.Provider
            value={{ loggedUser, setLoggedUser, loggedUserId, setLoggedUserId }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider