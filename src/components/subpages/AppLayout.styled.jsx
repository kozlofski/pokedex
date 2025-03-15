import React from 'react'
import Navbar from "./Navbar.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Main >
                <Outlet />
            </Main>
        </>
    )
}

export default AppLayout