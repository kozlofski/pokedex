import React, { useState, useEffect, useContext } from 'react'
import { styled } from "styled-components"
import PokemonCard from '../shared/PokemonCard.styled'
import Pagination from '../shared/Pagination.styled'
import useFetchPokemons from '../../hooks/useFetchPokemons'
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import { createPortal } from "react-dom"
import LoginContext from '../../context/LoginContext';
import fetchUserData from './../../services/fetchUserData'

const PAGE_LIMIT = 15
const JSON_SERVER_URL = "http://localhost:3000/users"

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
    const { pokemons, isPending } = useFetchPokemons();
    const [filter, setFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons)
    const [pokemonsPaginated, setPokemonsPaginated] = useState(null)
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const { loggedUserId } = useContext(LoginContext)

    useEffect(() => {
        filterPokemons()
    }, [filter, pokemons])

    useEffect(() => {
        const paginated = pokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setPokemonsPaginated(paginated)
    }, [currentPage, pokemonsFiltered])

    const filterPokemons = async () => {
        const filterInput = (pokemon) => pokemon.name.toLowerCase().includes(filter)
        let filtered = pokemons.filter(filterInput);

        if (favourites) {
            try {
                const userDataResponse = await fetchUserData(JSON_SERVER_URL, loggedUserId)
                // console.log("Fetched favs in filter: ", userDataResponse.favourites);
                const filterFavourites = (pokemon) => pokemon.name in userDataResponse.favourites
                filtered = filtered.filter(filterFavourites)
            } catch (error) {
                console.log(error)
            }
        }

        // console.log(`Filtered pokemons ${favourites && "and favourited"}: `, filtered)
        setCurrentPage(1)
        setPokemonsFiltered(filtered)
    }

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    return (
        <BrowserContainer>
            <PokemonsFilter
                onChange={(e) => setFilter(e.target.value)}
                placeholder='Search'></PokemonsFilter>
            <Pagination
                pokemonsFiltered={pokemonsFiltered}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
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