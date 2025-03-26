import React, { useState, useContext, useEffect } from 'react'
import { styled } from "styled-components"
import GlobalContext from '../../context/GlobalContext'
import PokemonCard from '../shared/PokemonCard.styled'
import LoginContext from '../../context/LoginContext'
import useFetchArena from '../../hooks/useFetchArena'
import { createPortal } from "react-dom"
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import EmptyPokemonCard from '../shared/EmptyPokemonCard.styled'
import CloseIcon from '@mui/icons-material/Close';
import FightButton from '../shared/FightButton.styled'
import fight from '../../services/fight'
import WinnerModal from '../shared/WinnerModal.styled'


const JSON_SERVER_URL = "http://localhost:3000/users"

const ArenaContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
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

    const { leftPokemonFromArena, rightPokemonFromArena } = useFetchArena(JSON_SERVER_URL, loggedUserId)
    // console.log("In arena: ", leftPokemonFromArena, rightPokemonFromArena)
    const [leftPokemon, setLeftPokemon] = useState(undefined)
    const [rightPokemon, setRightPokemon] = useState(undefined)
    const [winner, setWinner] = useState({})
    const [winnerModalOpened, setWinnerModalOpened] = useState(false)

    useEffect(() => {
        setLeftPokemon(leftPokemonFromArena)
        setRightPokemon(rightPokemonFromArena)
    }, [leftPokemonFromArena, rightPokemonFromArena])

    console.log("Pokemons: ", leftPokemon, rightPokemon)

    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    const winnerModal = createPortal(
        <WinnerModal onClose={() => {
            removeFromArena("both")
            setWinnerModalOpened(false)
        }} pokemon={winner} />,
        document.body
    )

    const removeFromArena = async (side) => {
        console.log(`removing ${side} from arena`)
        try {
            let newArena = {}
            if (side === "left") {
                newArena["rightPokemon"] = rightPokemon
                setLeftPokemon(undefined)
            }
            else if (side === "right") {
                newArena["leftPokemon"] = leftPokemon
                setRightPokemon(undefined)
            } else {
                setLeftPokemon(undefined)
                setRightPokemon(undefined)
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

    const handleFight = async () => {
        const winnerFromService = await fight(leftPokemon, rightPokemon)
        setWinner(winnerFromService)
        setWinnerModalOpened(true)
    }

    // useEffect(() => {
    //     console.log("Winner: ", winner)
    // }, [winner])

    return (
        <ArenaContainer>
            <ArenaCardContainer>
                {leftPokemon ?
                    <PokemonCard
                        pokemon={leftPokemon}
                        setModalOpened={setModalOpened}
                        setSelectedPokemon={setSelectedPokemon}
                    /> :
                    <EmptyPokemonCard />}
                {leftPokemon && <RemoveFromArena onClick={() => removeFromArena("left")}><CloseIcon /></RemoveFromArena>}
            </ArenaCardContainer>

            <FightButton
                onClick={handleFight}
                disabled={!(leftPokemon && rightPokemon)} >
                WALCZ!
            </FightButton>

            <ArenaCardContainer>
                {rightPokemon ?
                    <PokemonCard
                        pokemon={rightPokemon}
                        setModalOpened={setModalOpened}
                        setSelectedPokemon={setSelectedPokemon}
                    /> :
                    <EmptyPokemonCard />}
                {rightPokemon && <RemoveFromArena onClick={() => removeFromArena("right")}><CloseIcon /></RemoveFromArena>}
            </ArenaCardContainer>
            {modalOpened && modal}
            {winnerModalOpened && winnerModal}


        </ArenaContainer>
    )
}

export default Arena