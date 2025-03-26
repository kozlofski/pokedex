import React, { useState, useContext } from 'react'
import { styled } from "styled-components"
import GlobalContext from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
import LoginContext from '../../context/LoginContext'
import useFetchArena from '../../hooks/useFetchArena'
import { createPortal } from "react-dom"
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import EmptyPokemonCard from '../shared/EmptyPokemonCard.styled'
import CloseIcon from '@mui/icons-material/Close';



const JSON_SERVER_URL = "http://localhost:3000/users"

const ArenaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 2rem;
`

const ArenaCardContainer = styled.div`
    position: relative;
`

const RemoveFromArena = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`

const Arena = () => {
    const { loggedUserId } = useContext(LoginContext)

    const { leftPokemon: left, rightPokemon: right } = useFetchArena(JSON_SERVER_URL, loggedUserId)

    // const arena = useFetchArena(JSON_SERVER_URL, loggedUserId);
    // console.log("Arena: ", arena, arena.leftPokemon, arena.rightPokemon)
    // const [left, setLeft] = useState(arena.leftPokemon)
    // const [right, setRight] = useState(arena.rightPokemon)
    console.log("Pokemons: ", left, right)
    // const { leftPokemon, rightPokemon } = arena

    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    const removeFromArena = async (side) => {
        console.log(`removing ${side} from arena`)
        try {
            let newArena = {}
            if (side === "left") {
                newArena["leftPokemon"] = left

            } else {
                newArena["rightPokemon"] = right
            }

            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    arena: newArena
                })
            })
            if (!patchResponse) throw new Error("Error patching arena")

            // setArena(newArena)
            // setIsOnArena(newIsOnArena);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ArenaContainer>
            <ArenaCardContainer>
                {left ? <PokemonCard pokemon={left} setModalOpened={setModalOpened} setSelectedPokemon={setSelectedPokemon} /> : <EmptyPokemonCard />}
                {left && <RemoveFromArena onClick={() => removeFromArena("left")}><CloseIcon /></RemoveFromArena>}
            </ArenaCardContainer>
            <button disabled={!(left && right)} >WALCZ</button>

            <ArenaCardContainer>
                {right ? <PokemonCard pokemon={right} setModalOpened={setModalOpened} setSelectedPokemon={setSelectedPokemon} /> : <EmptyPokemonCard />}
                {right && <RemoveFromArena onClick={() => removeFromArena("right")}><CloseIcon /></RemoveFromArena>}
            </ArenaCardContainer>
            {modalOpened && modal}


        </ArenaContainer>
    )
}

export default Arena