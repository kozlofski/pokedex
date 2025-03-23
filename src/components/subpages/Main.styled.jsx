import React, { useContext } from 'react'

import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'

const MainContainer = styled.div`
    height: 100%;
`

const Main = ({ children }) => {
    const loggedUser = localStorage.getItem("loggedUser")
    const { setLoggedUser } = useContext(LoginContext)

    if (loggedUser !== "null") setLoggedUser(loggedUser)

    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main