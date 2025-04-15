import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"
// import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StadiumIcon from '@mui/icons-material/Stadium';
import CloseIcon from '@mui/icons-material/Close';
import LoginContext from '../../context/LoginContext';
import GlobalContext from '../../context/GlobalContext';

import { LIMIT, PICTURES_TO_CHOOSE } from '../../constants';
import fetchSinglePokemon from '../../services/fetchSinglePokemon';
import useFetchRawPokemons from '../../hooks/useFetchRawPokemons';
import Button from './Button.styled';

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
    z-index: 10;
    // overflow: hidden;
  `

const ModalContent = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, #cacdca, #ffffff, #cacdca);
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

const Image = styled.img`
    height: 100%;

    @media (max-width: 600px) {
        // fix this
    }
`


const PokemonPictureModal = ({ onClose, setChosenImageUrl }) => {
    const { pokemons } = useFetchRawPokemons(LIMIT, PICTURES_TO_CHOOSE)
    const [currentPictureNumber, setCurrentPictureNumber] = useState(0)
    const [currentPictureUrl, setCurrentPictureUrl] = useState()

    useEffect(() => {
        (async () => {
            const { imgUrl } = await fetchSinglePokemon(pokemons[0].url)
            console.log(imgUrl)
            setCurrentPictureUrl(imgUrl)
        })()
    }, [pokemons])


    const handlePrevPicture = async () => {
        let current = currentPictureNumber;
        current--;
        if (current < 0) current = PICTURES_TO_CHOOSE - 1
        console.log("Current: ", current)
        setCurrentPictureNumber(current)
        const { imgUrl } = await fetchSinglePokemon(pokemons[current].url)
        console.log(imgUrl)
        setCurrentPictureUrl(imgUrl)
    }

    const handleNextPicture = async () => {
        let current = currentPictureNumber;
        current++;
        if (current >= PICTURES_TO_CHOOSE) current = 0
        console.log("Current: ", current)
        setCurrentPictureNumber(current)
        const { imgUrl } = await fetchSinglePokemon(pokemons[current].url)
        console.log(imgUrl)
        setCurrentPictureUrl(imgUrl)
    }

    const handleChoosePicture = () => {
        setChosenImageUrl(currentPictureUrl)
        onClose()
    }


    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Button onClick={handlePrevPicture}>prev</Button>
                <Image src={currentPictureUrl} onClick={handleChoosePicture} />
                <Button onClick={handleNextPicture}>next</Button>
            </ModalContent>
        </Modal>
    );
}

export default PokemonPictureModal