import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"

import CloseIcon from '@mui/icons-material/Close';

import Button from './Button';
import fetchSinglePokemon from '../../services/fetchSinglePokemon';
import useFetchRawPokemons from '../../hooks/useFetchRawPokemons';
import fetchUserData from '../../services/fetchUserData';
import { LIMIT, PICTURES_TO_CHOOSE } from '../../constants';

const PokemonPictureModal = ({ onClose, setChosenImageUrl, userId }) => {
    const { rawPokemons: pokemons } = useFetchRawPokemons(LIMIT, PICTURES_TO_CHOOSE)
    const [currentPictureNumber, setCurrentPictureNumber] = useState(0)
    const [currentPictureUrl, setCurrentPictureUrl] = useState()
    const [picturesUsed, setPicturesUsed] = useState([])
    const [pictureTaken, setPictureTaken] = useState(false)

    useEffect(() => {
        (async () => {
            if (pokemons[0] === undefined) return
            try {
                const { imgUrl } = await fetchSinglePokemon(pokemons[0].url)
                setCurrentPictureUrl(imgUrl)

                const userData = await fetchUserData(userId)
                const picturesUsedData = userData.picturesUsed;
                setPicturesUsed(picturesUsedData)

                if (imgUrl in picturesUsedData) setPictureTaken(true)
                else setPictureTaken(false)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [pokemons, userId])


    const handlePrevPicture = async () => {
        let current = currentPictureNumber;
        current--;
        if (current < 0) current = PICTURES_TO_CHOOSE - 1
        setCurrentPictureNumber(current)
        const { imgUrl } = await fetchSinglePokemon(pokemons[current].url)
        setCurrentPictureUrl(imgUrl)

        if (imgUrl in picturesUsed) setPictureTaken(true)
        else setPictureTaken(false)
    }

    const handleNextPicture = async () => {
        let current = currentPictureNumber;
        current++;
        if (current >= PICTURES_TO_CHOOSE) current = 0
        setCurrentPictureNumber(current)
        const { imgUrl } = await fetchSinglePokemon(pokemons[current].url)
        setCurrentPictureUrl(imgUrl)

        if (imgUrl in picturesUsed) setPictureTaken(true)
        else setPictureTaken(false)
    }

    const handleChoosePicture = () => {
        if (pictureTaken) return
        setChosenImageUrl(currentPictureUrl)
        onClose()
    }


    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <Button onClick={handlePrevPicture}>prev</Button>
                <Image className={pictureTaken && "taken"} src={currentPictureUrl} onClick={handleChoosePicture} />
                <Button onClick={handleNextPicture}>next</Button>
                <Close onClick={onClose}><CloseIcon /></Close>
            </ModalContent>
        </Modal>
    );
}

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000088;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    z-index: 10;
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

    @media (max-width: 660px) {
        padding: 4rem 0.5rem;
        flex-direction: column;
        height: fit-content;
    }
`

const Image = styled.img`
    height: 100%;

    &.taken {
        filter: grayscale(100%) contrast(70%) brightness(140%) ;
    }
`

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`

export default PokemonPictureModal