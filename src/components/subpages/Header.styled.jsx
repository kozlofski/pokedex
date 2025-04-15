import React, { useState, useContext } from 'react'
import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'
import Button from '../shared/Button.styled'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
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
    width: 100%;

     @media (max-width: 660px) {
        width: 100%;
        justify-content: flex-start;
        padding: 0;
        position: fixed;
        top: 0;
        z-index: 10;
        background: ${({ theme }) => theme.color.background};
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
        
        &.menuClosed {
            display: none;
        }
    }
   
`



const Logo = styled.img`
    width: 140px;

     @media (max-width: 768px) {
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
const MenuIconWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    @media (min-width: 661px) {
        display: none;
    }
`

const StyledLink = styled(Link)`
    flex-shrink: 1;

    @media (min-width: 769px) {  

        &.homeMobile {
            display: none;
        }
    }
`

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false)
    const { loggedUser } = useContext(LoginContext)

    const handleClickMobileMenu = () => {
        setMenuOpened(prev => !prev)
    }

    const Navbar = ({ links }) => {
        return (<LinkList className={!menuOpened && "menuClosed"}>
            <li><StyledLink className="homeMobile" to={"/"}><Button onClick={() => setMenuOpened(false)}>Home</Button></StyledLink></li>
            {links.map(({ name, id, path }) =>
                <li key={id}>
                    <StyledLink to={path}>
                        <Button onClick={() => setMenuOpened(false)}>{name}</Button>
                    </StyledLink>
                </li>)}
        </LinkList>)
    }

    return (<HeaderContainer>
        <MenuIconWrapper onClick={handleClickMobileMenu} >
            <MenuIcon />
        </MenuIconWrapper>
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

