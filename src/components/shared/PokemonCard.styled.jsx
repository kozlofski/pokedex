import React from 'react'
import { styled } from "styled-components"

const Card = styled.div`
    border: 1px solid black;

`

const PokemonCard = ({ name, height, weight }) => {
    console.log("rendering", name)

    return (
        <Card>
            <p>{name}</p>
            <p>{height}</p>
            <p>{weight}</p>
        </Card>
    )
}

export default PokemonCard