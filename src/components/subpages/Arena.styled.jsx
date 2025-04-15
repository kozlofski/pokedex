import React, { useState, useEffect, useContext } from 'react'

import { styled } from "styled-components"
import PokemonCard from '../shared/PokemonCard.styled'
import LoginContext from '../../context/LoginContext'
import useFetchArena from '../../hooks/useFetchArena'
import { useNavigate } from 'react-router-dom'

import { createPortal } from "react-dom"
import PokemonDetailsModal from '../shared/PokemonDetailsModal.styled'
import EmptyPokemonCard from '../shared/EmptyPokemonCard.styled'
import CloseIcon from '@mui/icons-material/Close';
import FightButton from '../shared/FightButton.styled'
import fight from '../../services/fight'
import WinnerModal from '../shared/WinnerModal.styled'
import updateStats from '../../services/updateStats'
import { JSON_SERVER_URL } from '../../constants'
import updateArena from '../../services/updateArena'

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
        <WinnerModal onClose={() => {
            removeFromArena("both")
            setWinnerModalOpened(false)
        }} pokemon={winner} />,
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
        <ArenaContainer>
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
                disabled={!(leftPokemon && rightPokemon)} >
                WALCZ!
            </FightButton>

            <ArenaCardContainer>
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
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 768px) {
        flex-wrap: wrap;
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