import React from 'react'
import { useState } from 'react';
import { styled } from "styled-components"
import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  `

const ModalContent = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, #ddddde, #ffffff, #ddddde);
    width: min(90%, 900px);
    height: 20rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;

    @media (max-width: 600px) {
        flex-direction: column;
        height: fit-content;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
`

const Image = styled.img`
    height: 100%;

    @media (max-width: 600px) {
        // fix this
    }
`
// move from styles here down on to common file


const Header = styled.p`
    font-size: 1.75rem;
    font-weight: 900;
    margin: 0;
`

const Characteristics = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;  
    gap: 2rem;  
    flex-basis: 50%;
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

const Heart = styled.div`
    position: absolute;
    left: 1rem;
    bottom: 1rem;
`
const favourited = true;

const PokemonDetailsModal = ({ onClose, pokemon }) => {
    // console.log("Modal: ", pokemon)

    const [isFavourite, setIsFavourite] = useState(false);

    const { baseExperience,
        height,
        weight,
        ability,
        imgUrl } = useFetchSinglePokemon(pokemon.url)


    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Image src={imgUrl} alt="" />
                <Description>
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
                </Description>
                <Heart onClick={() => setIsFavourite(prev => !prev)}>{isFavourite ?
                    <FavoriteIcon /> :
                    <FavoriteBorderIcon />}
                </Heart>
            </ModalContent>
        </Modal>
    );
}

export default PokemonDetailsModal