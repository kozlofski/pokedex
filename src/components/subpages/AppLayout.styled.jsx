import React from 'react'
import Header from "./Header.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'
import { styled } from "styled-components"

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 100px 1fr;
    background: ${({ theme }) => theme.color.background};

    @media (max-width: 660px) {
        // padding-top: 1rem;
        grid-template-rows: 1fr;
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