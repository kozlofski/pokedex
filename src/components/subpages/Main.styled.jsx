import React, { useContext } from 'react'

import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'

const MainContainer = styled.div`
    height: 100%;
`

const Main = ({ children }) => {
    const loggedUser = localStorage.getItem("loggedUser")
    const { setLoggedUser, setLoggedUserId } = useContext(LoginContext)

    if (loggedUser !== "null") {
        setLoggedUser(loggedUser)
        const loggedUserIndex = localStorage.getItem("loggedUserId")
        setLoggedUserId(parseInt(loggedUserIndex))
    }

    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main