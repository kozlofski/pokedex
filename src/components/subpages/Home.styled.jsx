import React from 'react'
import { styled } from "styled-components"
import useFetchPokemons from '../../hooks/useFetchPokemons'

const PokemonsBrowser = styled('div')`
    display: flex;
    flex-direction: row;
`

const Home = () => {
    const { pokemons } = useFetchPokemons();

    return (
        <div>
            <div>Search Pokemąs</div>
            <PokemonsBrowser></PokemonsBrowser>
        </div>
    )
}

export default Home