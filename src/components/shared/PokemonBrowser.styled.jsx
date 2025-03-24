import React, { useState, useEffect, useContext } from 'react'
import { styled } from "styled-components"
import PokemonCard from '../shared/PokemonCard.styled'
import Pagination from '../shared/Pagination.styled'
import useFetchPokemons from '../../hooks/useFetchPokemons'
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import { createPortal } from "react-dom"
import LoginContext from '../../context/LoginContext';


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
    console.log("Render pokemon component")
    const { pokemons, isPending } = useFetchPokemons();
    const [pokemonsFiltered, setPokemonsFiltered] = useState(pokemons)
    const [pokemonsPaginated, setPokemonsPaginated] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const { loggedUserId } = useContext(LoginContext)


    // useEffect(() => filterPokemons, [])

    useEffect(() => {
        const paginated = pokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setPokemonsPaginated(paginated)
    }, [currentPage, pokemonsFiltered])

    const filterPokemons = async (event) => {
        let filteredFavs = []
        if (favourites) {
            try {
                const response = await fetch(`${JSON_SERVER_URL}/${loggedUserId}`)
                if (!response) throw new Error("Problem with fetching favourites")

                const jsonResponse = await response.json();
                console.log("Fetched favs in filter: ", jsonResponse.favourites);
                filteredFavs = await pokemons.filter((pokemon) => pokemon.name in jsonResponse.favourites)
            } catch (error) {
                console.log(error)
            }
        } else {
            filteredFavs = pokemons;
        }
        console.log("Filtered favs: ", filteredFavs)

        const filter = event.target.value;
        console.log(filter)
        const filtered = filteredFavs.filter((pokemon) => pokemon.name.toLowerCase().includes(filter));
        console.log("filtereded favs after input filter: ", filtered)
        setCurrentPage(1)
        setPokemonsFiltered(filtered)
    }
    // filterPokemons();

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    return (
        <BrowserContainer>
            <PokemonsFilter
                onChange={filterPokemons}
                placeholder='Search'></PokemonsFilter>
            <Pagination
                pokemonsFiltered={pokemonsFiltered}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
            <PokemonsGallery>
                {isPending && <p style={{ fontSize: "2rem" }}>Loading pokemons...</p>}
                {isPending || pokemonsPaginated && pokemonsPaginated.map((pokemon, id) => {
                    return <li key={id}>
                        <PokemonCard pokemon={pokemon}
                            setModalOpened={setModalOpened}
                            setSelectedPokemon={setSelectedPokemon} />
                    </li>
                }
                )}
            </PokemonsGallery>
            {modalOpened && modal}
        </BrowserContainer>
    )
}

export default PokemonBrowser