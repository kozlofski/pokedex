import React, { useState } from 'react'
import { styled } from "styled-components"
import { createPortal } from "react-dom"

import Pagination from './Pagination'
import PokemonCard from '../shared/PokemonCard'
import PokemonDetailsModal from '../shared/PokemonDetailsModal'
import useFetchRawPokemons from '../../hooks/useFetchRawPokemons'
import Loader from './Loader'
import { LIMIT } from '../../constants'

const PokemonBrowser = ({ favourites }) => {
    const { rawPokemons, isPending } = useFetchRawPokemons(0, LIMIT, favourites);
    const [rawPokemonsFiltered, setRawPokemonsFiltered] = useState()
    const [rawPokemonsPaginated, setRawPokemonsPaginated] = useState(null)
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const handleFilter = async (event) => {
        const input = event.target.value
        const filterInput = (rawPokemon) => rawPokemon.name.toLowerCase().includes(input)
        let filtered = rawPokemons.filter(filterInput);
        setRawPokemonsFiltered(filtered)
    }

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    return (
        <BrowserContainer>
            <PokemonsFilter
                onChange={handleFilter}
                placeholder='Search pokemon'></PokemonsFilter>
            <Pagination
                rawPokemonsFiltered={rawPokemonsFiltered || rawPokemons}
                setRawPokemonsPaginated={setRawPokemonsPaginated}
            />
            <PokemonsGallery>
                {isPending && <Loader />}
                {isPending || rawPokemonsPaginated && rawPokemonsPaginated.map((rawPokemon, id) => {
                    return <li key={id}>
                        <PokemonCard rawPokemon={rawPokemon}
                            setModalOpened={setModalOpened}
                            setSelectedPokemon={setSelectedPokemon}
                        />
                    </li>
                }
                )}
            </PokemonsGallery>
            {modalOpened && modal}
        </BrowserContainer>
    )
}

const BrowserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    height: 100%;
    padding-bottom: 2rem;

    @media (max-width: 660px) {
        margin-top: 0.5rem;
        padding-bottom: 6rem;
    }
`

const PokemonsGallery = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1.5rem;
    list-style: none;    
    height: 100%;

`
const PokemonsFilter = styled.input`
    border: 2px solid ${({ theme }) => theme.color.inputBorder};
    color: ${({ theme }) => theme.color.fontOnBackground};
    background: ${({ theme }) => theme.color.background};
    padding: 0.5rem;
    border-radius: 0.25rem;

    &:focus {
        outline: none;
        border: 2px solid ${({ theme }) => theme.color.inputBorderFocus};
    }
`

export default PokemonBrowser