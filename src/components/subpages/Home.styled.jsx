import React from 'react'
import { styled } from "styled-components"
import useFetchPokemons from '../../hooks/useFetchPokemons'

const PokemonsBrowser = styled.ul`
    display: flex;
    flex-direction: row;
`

const Home = () => {
    const { pokemons } = useFetchPokemons();
    console.log("Pokemons from main: ", pokemons)

    return (
        <div>
            <div>Search Pokemąs</div>
            <PokemonsBrowser>
                {pokemons.map((pokemon, id) => {
                    { console.log("Rendered: ", pokemon.name) }
                    <li key={id}>{pokemon.name}</li>
                })}
            </PokemonsBrowser>
        </div>
    )
}

export default Home