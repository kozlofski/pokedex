import LoginContext from "./LoginContext";
import { useState } from "react"

const JSON_SERVER_URL = "http://localhost:3000/users"


import loginUser from "../services/loginUser";

const LoginContextProvider = ({ children }) => {

    const userName = localStorage.getItem("loggedUser") ?? "null"
    const id = localStorage.getItem("loggedUserId") ?? "-1"
    const hashedPassword = parseInt(localStorage.getItem("loggedUserHashedPassword")) ?? 0
    const [loggedUser, setLoggedUser] = useState(userName)
    const [loggedUserId, setLoggedUserId] = useState(id)

    userName === "null" || loginUser(userName, hashedPassword, JSON_SERVER_URL, setLoggedUser, setLoggedUserId)


    return (
        <LoginContext.Provider
            value={{ loggedUser, setLoggedUser, loggedUserId, setLoggedUserId }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider