import React from 'react'
import PokemonBrowser from '../shared/PokemonBrowser'

const Favorites = () => {
    return (<>
        <PokemonBrowser favourites={true} />
    </>)
}

export default Favorites