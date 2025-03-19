import React, { useState, useContext } from 'react'
import { styled } from "styled-components"
import GlobalContext from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
import Pagination from '../shared/Pagination.styled'
import useFetchPokemons from '../../hooks/useFetchPokemons'

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

    &:focus {
        border: 2px solid #999999;

    }
`
const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Home = () => {
    const { pokemons, isPending } = useFetchPokemons();
    const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons)
    const [pokemonsPaginated, setPokemonsPaginated] = useState(pokemonsFiltered)

    console.log("Pokemons from main: ", pokemons)
    // console.log("Pokemons filtered from main: ", pokemonsFiltered)
    // console.log("Pokemons paginated from main: ", pokemonsPaginated)

    const filterPokemons = (event) => {
        const filter = event.target.value;
        const filtered = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(filter));
        setPokemonsFiltered(filtered)
    }

    return (
        <HomeContainer>
            <PokemonsFilter
                onChange={filterPokemons}
                placeholder='Search'></PokemonsFilter>
            <Pagination
                pokemonsFiltered={pokemonsFiltered}
                setPokemonsPaginated={setPokemonsPaginated} />
            <PokemonsBrowser>
                {isPending && <p style={{ fontSize: "2rem" }}>Loading pokemons...</p>}
                {isPending || pokemons && pokemons.map((pokemon, id) => {
                    console.log("Will render card from: ", pokemon.url)

                    return <li key={id}>
                        <PokemonCard pokemon={pokemon} />
                    </li>
                }
                )}
            </PokemonsBrowser>
        </HomeContainer >
    )
}

export default Home