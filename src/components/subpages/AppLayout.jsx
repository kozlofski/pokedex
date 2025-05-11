import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from "styled-components"

import Header from "./Header"
import Main from "./Main"

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

const AppContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: 6.25rem 1fr;
    grid-template-cols: 1fr;
    background: ${({ theme }) => theme.color.background};

    @media (max-width: 660px) {
        grid-template-rows: 1fr;
        margin-top: 3rem;
    }
`

export default AppLayout