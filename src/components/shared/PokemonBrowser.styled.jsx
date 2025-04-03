import React, { useState, useEffect, useContext } from 'react'
import { styled } from "styled-components"
import { createPortal } from "react-dom"

import Pagination from '../shared/Pagination.styled'
import PokemonCard from '../shared/PokemonCard.styled'
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import LoginContext from '../../context/LoginContext';
import useFetchPokemons from '../../hooks/useFetchPokemons'
import fetchUserData from './../../services/fetchUserData'

import { PAGE_LIMIT } from "../../constants"

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
    const { loggedUserId } = useContext(LoginContext)
    const { pokemons, isPending } = useFetchPokemons();

    const [pokemonsFiltered, setPokemonsFiltered] = useState()
    const [pokemonsPaginated, setPokemonsPaginated] = useState(null)
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const handleFilter = async (event) => {
        const input = event.target.value
        const filterInput = (pokemon) => pokemon.name.toLowerCase().includes(input)
        let filtered = pokemons.filter(filterInput);

        if (favourites) {
            try {
                const userDataResponse = await fetchUserData(loggedUserId)
                if (!userDataResponse) throw new Error("Error fetching user data from JSON server")
                const filterFavourites = (pokemon) => pokemon.name in userDataResponse.favourites
                filtered = filtered.filter(filterFavourites)
            } catch (error) {
                console.log("Error in filtering favourites in browser: ", error)
            }
        }
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