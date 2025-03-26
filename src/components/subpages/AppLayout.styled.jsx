import React from 'react'
import Header from "./Header.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'
import { styled } from "styled-components"

const AppContainer = styled.div`
   display: grid;
   grid-template-rows: 100px calc(100vh - 100px);
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