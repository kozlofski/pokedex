import React, { useState, useContext } from 'react'
import { styled } from "styled-components"
import { GlobalContext } from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
import Pagination from '../shared/Pagination.styled'

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
    const { pokemons, currentPage } = useContext(GlobalContext)
    // here will be also loaded user's pokemons, and array will be joined together
    // users pokemons will be in an object to fast lookup (hashmap)
    const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons)
    const [pokemonsPaginated, setPokemonsPaginated] = useState([])
    // console.log("Pokemons from main: ", pokemons)

    const filterPokemons = (event) => {
        const filter = event.target.value;
        const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filter));
        setPokemonsFiltered(filtered)
    }

    const paginate = () => {
        const paginated = pokemonsFiltered.slice(1 + (currentPage - 1) * 15, (currentPage) * 15);
        setPokemonsPaginated(paginated)
    }

    return (
        <HomeContainer>
            <PokemonsFilter onChange={filterPokemons} placeholder='Search'></PokemonsFilter>
            <Pagination totalPokemons={pokemons.length} />
            <PokemonsBrowser>
                {pokemonsFiltered.length > 0 && pokemonsFiltered.map((pokemon, id) => {
                    // { console.log("Inside PokemonBrowser: ", pokemon) }
                    return <li key={id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                })}
            </PokemonsBrowser>
        </HomeContainer>
    )
}

export default Home