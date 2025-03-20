import React, { useState, useContext, useEffect } from 'react'
import { styled } from "styled-components"
import GlobalContext from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
import Pagination from '../shared/Pagination.styled'
import useFetchPokemons from '../../hooks/useFetchPokemons'

const PAGE_LIMIT = 15

const PokemonsBrowser = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
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
    const [pokemonsPaginated, setPokemonsPaginated] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => setPokemonsFiltered(pokemons), [pokemons])

    useEffect(() => {
        const paginated = pokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setPokemonsPaginated(paginated)
    }, [currentPage, pokemonsFiltered])

    const filterPokemons = (event) => {
        setCurrentPage(1)
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
            <PokemonsBrowser>
                {isPending && <p style={{ fontSize: "2rem" }}>Loading pokemons...</p>}
                {isPending || pokemonsPaginated && pokemonsPaginated.map((pokemon, id) => {
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