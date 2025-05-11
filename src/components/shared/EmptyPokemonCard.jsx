import React from 'react'
import { styled } from "styled-components"

import pokeballSrc from "../../assets/pokeball.svg"

const EmptyPokemonCard = () => {
    return (
        <Card >
            <Image src={pokeballSrc} />
        </Card>
    )
}

const Card = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem ${({ theme }) => theme.color.cardShadow};
    background: linear-gradient(135deg, ${({ theme }) => theme.color.cardDark},${({ theme }) => theme.color.cardLight}, ${({ theme }) => theme.color.cardDark});
    width: 15rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    height: 30%;
    filter: brightness(20%);
`

export default EmptyPokemonCard