import React from 'react'
import { styled } from "styled-components"

const Card = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, #ddddde, #ffffff, #ddddde);
    width: 15rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
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

const PokemonCard = ({ pokemon }) => {
    const { name, height, weight, imgUrl, baseExperience, ability } = pokemon
    // console.log("rendering", name)

    return (
        <Card>
            <Image src={imgUrl} alt="" />
            <Header>{name}</Header>
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
        </Card>
    )
}

export default PokemonCard