import React from 'react'
import Navbar from "./Navbar.styled"
import Main from "./Main.styled"
import { Outlet } from 'react-router-dom'

const AppLayout = ({ children }) => {
    return (
        <>
            <h2>AppLayout</h2>
            <Navbar />
            <Main >
                <Outlet />
            </Main>
        </>
    )
}

export default AppLayout