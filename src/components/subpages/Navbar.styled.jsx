import React from 'react'

import { Link } from 'react-router-dom'

// mocked:
const isLoggedIn = true

const routesIfLoggedIn = [
    { name: "Ulubione", id: 3, path: "/favorites" },
    { name: "Arena", id: 4, path: "/arena" },
    { name: "Ranking", id: 5, path: "/ranking" },
    { name: "Edycja", id: 6, path: "/edit" },
    { name: "Wyloguj", id: 7, path: "/logout" },
]

const routesIfNotLoggedIn = [
    { name: "Logowanie", id: 1, path: "/log-in" },
    { name: "Rejestracja", id: 2, path: "/sing-up" },
]

const Navbar = () => {
    return (<>
        <div>Navbar</div>
        <Link to={"/"}>Pokemon logo (home)</Link>
        <LinkList links={isLoggedIn ? routesIfLoggedIn : routesIfNotLoggedIn} />
    </>
    )
}

const LinkList = ({ links }) => {
    return (<ul>
        {links.map(({ name, id, path }) =>
            <li key={id}>
                <Link to={path}>{name}</Link>
            </li>)}
    </ul>)
}

export default Navbar

