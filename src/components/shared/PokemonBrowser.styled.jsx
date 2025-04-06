import React, { useState } from 'react'
import { styled } from "styled-components"
import { createPortal } from "react-dom"

import Pagination from '../shared/Pagination.styled'
import PokemonCard from '../shared/PokemonCard.styled'
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import useFetchPokemons from '../../hooks/useFetchPokemons'
import { LIMIT } from '../../constants'


const PokemonsGallery = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
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
const BrowserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PokemonBrowser = ({ favourites }) => {
    const { pokemons, isPending } = useFetchPokemons(0, LIMIT, favourites);

    console.log(pokemons)
    const [pokemonsFiltered, setPokemonsFiltered] = useState()
    const [pokemonsPaginated, setPokemonsPaginated] = useState(null)
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const handleFilter = async (event) => {
        const input = event.target.value
        const filterInput = (pokemon) => pokemon.name.toLowerCase().includes(input)
        let filtered = pokemons.filter(filterInput);
        setPokemonsFiltered(filtered)
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
                pokemonsFiltered={pokemonsFiltered || pokemons}
                setPokemonsPaginated={setPokemonsPaginated}
            />
            <PokemonsGallery>
                {/* turn loader into separate component */}
                {isPending && <p style={{ fontSize: "2rem" }}>Loading pokemons...</p>}
                {isPending || pokemonsPaginated && pokemonsPaginated.map((pokemon, id) => {
                    return <li key={id}>
                        <PokemonCard pokemon={pokemon}
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

export default PokemonBrowser