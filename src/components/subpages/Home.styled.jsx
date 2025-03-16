import React, { useState, useContext } from 'react'
import { styled } from "styled-components"
import { GlobalContext } from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
// import useFetchPokemons from '../../hooks/useFetchPokemons'

const PokemonsBrowser = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;
`
const PokemonsFilter = styled.input`
    border: 2px solid #aaaaaa;
    padding: 0.5rem;
    border-radius: 0.25rem;
`

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Home = () => {
    const { pokemons } = useContext(GlobalContext)
    const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons)
    // console.log("Pokemons from main: ", pokemons)

    const filterPokemons = (event) => {
        const filter = event.target.value;
        const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filter));
        setPokemonsFiltered(filtered)
    }

    return (
        <HomeContainer>
            <PokemonsFilter onChange={filterPokemons} placeholder='Search'></PokemonsFilter>
            <PokemonsBrowser>
                {pokemonsFiltered.length > 0 && pokemonsFiltered.map((pokemon, id) => {
                    { console.log("Inside PokemonBrowser: ", pokemon) }
                    return <li key={id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                })}
            </PokemonsBrowser>
        </HomeContainer>
    )
}

export default Home