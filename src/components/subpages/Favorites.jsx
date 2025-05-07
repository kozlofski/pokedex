import React from 'react'
import PokemonBrowser from '../shared/PokemonBrowser'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import LoginContext from '../../context/LoginContext'

const Favorites = () => {
    const { loggedUserId } = useContext(LoginContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (loggedUserId === '-1') navigate('/forbidden')
    })

    return (<>
        {loggedUserId !== '-1' && <PokemonBrowser favourites={true} />}
    </>)
}

export default Favorites