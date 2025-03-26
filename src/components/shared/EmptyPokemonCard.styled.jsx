import React from 'react'
import { styled } from "styled-components"

import pokeballSrc from "../../assets/pokeball.svg"


const Card = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, #ddddde, #ffffff, #ddddde);
    width: 15rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

// move from styles here down on to common file

const Image = styled.img`
    height: 30%;
    filter: brightness(20%);
`

const EmptyPokemonCard = () => {


    return (
        <Card >
            <Image src={pokeballSrc} />

        </Card>
    )
}

export default EmptyPokemonCard