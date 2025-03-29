import React from 'react'
import { styled } from "styled-components"
import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'

const Card = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, #ddddde, #ffffff, #ddddde);
    width: 15rem;
    height: 20rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: all 0.1s ease-in-out;

    &:hover {
        transform: scale(1.05);
        transition: all 0.1s ease-in-out;
        box-shadow: 0.5rem 0.7rem 1.1rem #4444443A;

    }
`

// move from styles here down on to common file

const Image = styled.img`
    height: 50%;
`

const Header = styled.p`
    font-size: 1.75rem;
    font-weight: 900;
    margin: 0;
`

const Characteristics = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;  
    gap: 1rem;  
`

const Characteristic = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CharValue = styled.p`
    font-size: 0.75rem;
    font-weight: 100;
    margin: 0;
`

const ValueName = styled.p`
    font-size: 0.75rem;
    font-weight: 900;
    margin: 0;
`

const WinsAndLosses = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.25rem;
    background-color: #555555;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-left-radius: inherit;
    border-bottom-right-radius: inherit;
`

const WinOrLoss = styled.div`
    color: #ffffff;
    text-align: justify;  
`

const PokemonCard = ({ pokemon, setModalOpened, setSelectedPokemon }) => {
    const {
        height,
        baseExperience,
        weight,
        ability,
        imgUrl,
        wins,
        losses } = useFetchSinglePokemon(pokemon)

    const openDetails = () => {
        setModalOpened(true)
        setSelectedPokemon(pokemon)
    }

    return (
        <Card onClick={openDetails}>
            <Image src={imgUrl} alt="" />
            <Header>{pokemon.name}</Header>
            <Characteristics>
                <Characteristic>
                    <CharValue>{height}</CharValue>
                    <ValueName>Height</ValueName>
                </Characteristic>
                <Characteristic>
                    <CharValue>{baseExperience}</CharValue>
                    <ValueName>Base experience</ValueName>
                </Characteristic>
                <Characteristic>
                    <CharValue>{weight}</CharValue>
                    <ValueName>Weight</ValueName>
                </Characteristic>
                <Characteristic>
                    <CharValue>{ability}</CharValue>
                    <ValueName>Ability</ValueName>
                </Characteristic>
            </Characteristics>
            {wins !== undefined && <WinsAndLosses>
                <WinOrLoss>W: {wins}</WinOrLoss>
                <WinOrLoss>L: {losses}</WinOrLoss>
            </WinsAndLosses>}
        </Card>
    )
}

export default PokemonCard