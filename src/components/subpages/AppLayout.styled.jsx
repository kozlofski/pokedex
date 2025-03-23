import React from 'react'
import Header from "./Header.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <Header />
            <Main >
                <Outlet />
            </Main>
        </>
    )
}

export default AppLayout