import React, { useContext } from 'react'
import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'
import Button from '../shared/Button.styled'
import PersonIcon from '@mui/icons-material/Person';
import ThemeSwitcher from '../shared/ThemeSwitcher';

import logoPath from "../../assets/pokemonLogo.svg"

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
    align-items: center;
    padding: 1rem;

     @media (max-width: 660px) {
        justify-content: flex-start;
        padding: 0 0 2rem 0;
    }

`

const LinkList = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;

    @media (max-width: 660px) {
        flex-direction: column;
        width: 100%;
        // position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }
`

const Navbar = ({ links }) => {
    return (<LinkList>
        {links.map(({ name, id, path }) =>
            <li key={id}>
                <Link to={path}>
                    <Button nav="true">{name}</Button>
                </Link>
            </li>)}
    </LinkList>)
}

const Logo = styled.img`
    width: 140px;

     @media (max-width: 660px) {
        display: none;
    }
`

const UserAndNavbar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-grow: 1;

   
`

const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const User = styled.p`
    color: ${({ theme }) => theme.color.fontOnBackground};
    font-size: 1rem;    
`

const Header = () => {
    const { loggedUser } = useContext(LoginContext)

    return (<HeaderContainer>
        <Link to={"/"}><Logo src={logoPath} alt="POKEMON"></Logo></Link>
        <UserAndNavbar>
            <UserContainer>
                <ThemeSwitcher />
                {loggedUser !== "null" &&
                    <>
                        <PersonIcon style={{ color: ({ theme }) => theme.color.fontOnBackground }} />
                        <User>{loggedUser}</User>
                    </>
                }
            </UserContainer>
            <Navbar links={loggedUser === "null" ? routesIfNotLoggedIn : routesIfLoggedIn} />
        </UserAndNavbar>
    </HeaderContainer>
    )
}



export default Header

