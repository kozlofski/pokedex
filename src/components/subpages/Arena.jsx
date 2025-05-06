import React, { useState, useEffect, useContext } from 'react'
import { styled } from "styled-components"
import { createPortal } from "react-dom"

import LoginContext from '../../context/LoginContext'

import PokemonCard from '../shared/PokemonCard'
import PokemonDetailsModal from '../shared/PokemonDetailsModal'
import EmptyPokemonCard from '../shared/EmptyPokemonCard'
import CloseIcon from '@mui/icons-material/Close';
import FightButton from '../shared/FightButton'
import fight from '../../services/fight'
import WinnerModal from '../shared/WinnerModal'
import updateStats from '../../services/updateStats'
import updateArena from '../../services/updateArena'
import useFetchArena from '../../hooks/useFetchArena'

const Arena = () => {
    const { loggedUserId } = useContext(LoginContext)

    const { leftPokemonFromArena, rightPokemonFromArena } = useFetchArena(loggedUserId)
    const [leftPokemon, setLeftPokemon] = useState(undefined)
    const [rightPokemon, setRightPokemon] = useState(undefined)
    const [winner, setWinner] = useState({})
    const [winnerModalOpened, setWinnerModalOpened] = useState(false)

    useEffect(() => {
        setLeftPokemon(leftPokemonFromArena)
        setRightPokemon(rightPokemonFromArena)
    }, [leftPokemonFromArena, rightPokemonFromArena])

    const [modalOpened, setModalOpened] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const modal = createPortal(
        <PokemonDetailsModal onClose={() => setModalOpened(false)} pokemon={selectedPokemon} />,
        document.body
    )

    const winnerModal = createPortal(
        <WinnerModal
            onClose={() => {
                removeFromArena("both")
                setWinnerModalOpened(false)
            }}
            pokemon={winner}
            className="winner-modal" />,
        document.body
    )

    const removeFromArena = async (side) => {
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
            updateArena(newArena, loggedUserId)
        } catch (error) {
            console.error(error)
        }
    }

    const handleFight = async () => {
        const { winner: winnerFromService, loser: loserFromService } = fight(leftPokemon, rightPokemon)
        await updateStats(winnerFromService, loserFromService, loggedUserId)
        setWinner(winnerFromService)
        setWinnerModalOpened(true)
    }

    return (
        <ArenaContainer className="arena-container">
            <ArenaCardContainer>
                {leftPokemon !== undefined ?
                    <PokemonCard
                        rawPokemon={{ name: leftPokemon.name, url: leftPokemon.url ?? undefined }}
                        setModalOpened={setModalOpened}
                        setSelectedPokemon={setSelectedPokemon}
                    /> :
                    <EmptyPokemonCard />}
                {leftPokemon && <RemoveFromArena onClick={() => removeFromArena("left")}><CloseIcon /></RemoveFromArena>}
            </ArenaCardContainer>

            <FightButton
                onClick={handleFight}
                disabled={!(leftPokemon && rightPokemon)}
                className="fight-button">
                WALCZ!
            </FightButton>

            <ArenaCardContainer className="arena-card-container">
                {rightPokemon !== undefined ?
                    <PokemonCard
                        rawPokemon={rightPokemon}
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

const ArenaContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.25rem;
    }
`

const ArenaCardContainer = styled.div`
    position: relative;
`

const RemoveFromArena = styled.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`

export default Arena