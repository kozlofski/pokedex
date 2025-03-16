import React, { useContext } from 'react'
import { styled } from "styled-components"
import { GlobalContext } from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
// import useFetchPokemons from '../../hooks/useFetchPokemons'

const PokemonsBrowser = styled.ul`
    display: flex;
    flex-direction: column;
`

const Home = () => {
    const { pokemons } = useContext(GlobalContext)

    console.log("Pokemons from main: ", pokemons)

    return (
        <div>
            <div>Search Pokemons</div>
            <PokemonsBrowser>
                {pokemons.length > 0 && pokemons.map((pokemon, id) => {
                    { console.log("Inside PokemonBrowser: ", pokemon) }
                    return <li key={id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                })}
            </PokemonsBrowser>
        </div>
    )
}

export default Home