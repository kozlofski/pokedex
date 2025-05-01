import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { styled } from "styled-components"

import LoginContext from '../../context/LoginContext'

const LogoutScreen = styled.h2`
    display: flex;
    width: 100%;
    height: calc(100vh - 100px);
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    color: ${({ theme }) => theme.color.fontOnBackground}
`

const LogOut = () => {
    const { loggedUser, setLoggedUser, setLoggedUserId } = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("loggedUser", "null")
            setLoggedUser("null")
            localStorage.setItem("loggedUserId", "-1")
            setLoggedUserId("-1")
            navigate('/')
        }, 1500)
    }, [])

    return (
        <LogoutScreen>Logging out user {`${loggedUser}`}</LogoutScreen>
    )
}

export default LogOut