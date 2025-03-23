import React, { useContext } from 'react'
import { useState } from 'react'
import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'

const logoPath = "./../../assets/pokemonLogo.png"

import { Link } from 'react-router-dom'

const routesIfLoggedIn = [
    { name: "Ulubione", id: 3, path: "/favorites" },
    { name: "Arena", id: 4, path: "/arena" },
    { name: "Ranking", id: 5, path: "/ranking" },
    { name: "Edycja", id: 6, path: "/edit" },
    { name: "Wyloguj", id: 7, path: "/log-out" },
]

const routesIfNotLoggedIn = [
    { name: "Logowanie", id: 1, path: "/log-in" },
    { name: "Rejestracja", id: 2, path: "/sign-up" },
]

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

`

const LinkList = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

const Navbar = ({ links }) => {
    return (<LinkList>
        {links.map(({ name, id, path }) =>
            <li key={id}>
                <Link to={path}>{name}</Link>
            </li>)}
    </LinkList>)
}

const Logo = styled.img`
    width: 100px;
    height: 100px;
`

const UserAndNavbar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const User = styled.p`
    font-size: 1rem;
    
`

const Header = () => {
    const { loggedUser } = useContext(LoginContext)

    return (<HeaderContainer>
        <Link to={"/"}><Logo src={logoPath} alt="POKEMON"></Logo></Link>
        <UserAndNavbar>
            <User>{loggedUser ?? ""}</User>
            <Navbar links={loggedUser ? routesIfLoggedIn : routesIfNotLoggedIn} />
        </UserAndNavbar>
    </HeaderContainer>
    )
}



export default Header

