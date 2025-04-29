import React from 'react'
import Header from "./Header.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'
import { styled } from "styled-components"

const AppContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-cols: 1fr;
    background: ${({ theme }) => theme.color.background};

    @media (max-width: 660px) {
        grid-template-rows: 1fr;
        margin-top: 3rem;
    }
`

const AppLayout = () => {
    return (
        <AppContainer>
            <Header />
            <Main >
                <Outlet />
            </Main>
        </AppContainer>
    )
}

export default AppLayout