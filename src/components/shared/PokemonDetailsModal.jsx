import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"

import LoginContext from '../../context/LoginContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StadiumIcon from '@mui/icons-material/Stadium';
import CloseIcon from '@mui/icons-material/Close';

import fetchUserData from '../../services/fetchUserData';
import updateArena from '../../services/updateArena';
import updateFavourites from '../../services/updateFavourites';

const PokemonDetailsModal = ({ onClose, pokemon }) => {
    const { loggedUserId } = useContext(LoginContext)

    const [isFavourite, setIsFavourite] = useState(false);
    const [oldFavourites, setOldFavourites] = useState({});
    const [isOnArena, setIsOnArena] = useState(false)
    const [arena, setArena] = useState({})

    const { name,
        baseExperience,
        height,
        weight,
        ability,
        imgUrl,
        wins,
        losses } = pokemon

    const setHeartAndArenaIcons = async () => {
        try {
            const userData = await fetchUserData(loggedUserId)

            setOldFavourites(userData.favourites);
            setArena(userData.arena)

            if (name in userData.favourites) setIsFavourite(true)
            if (name === userData.arena.leftPokemon?.name || name === userData.arena.rightPokemon?.name) {
                setIsOnArena(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (loggedUserId !== "-1") setHeartAndArenaIcons();
    }, [])


    const toggleFavourite = async () => {
        const newIsFavourite = !isFavourite;

        try {
            let newFavourites = {}

            if (newIsFavourite === true) {
                newFavourites = oldFavourites
                newFavourites[name] = true
                // change pokemon.name to name
            } else {
                newFavourites = { ...oldFavourites }
                delete newFavourites[name]
            }

            updateFavourites(newFavourites, loggedUserId)

            setIsFavourite(newIsFavourite);
        } catch (error) {
            console.error(error)
        }
    }

    const toggleArena = async () => {
        try {
            let newArena = {}

            if (!isOnArena) {
                const pokemonsInArena = Object.keys(arena).length;

                if (pokemonsInArena === 0) {
                    newArena = { ...arena }
                    newArena["leftPokemon"] = pokemon
                }
                if (pokemonsInArena === 1) {
                    newArena = { ...arena }
                    "leftPokemon" in newArena ? newArena["rightPokemon"] = pokemon : newArena["leftPokemon"] = pokemon
                }
                if (pokemonsInArena === 2) return
            } else {
                newArena = { ...arena }
                if (name === newArena["leftPokemon"]?.name) delete newArena["leftPokemon"]
                else delete newArena["rightPokemon"]
            }
            await updateArena(newArena, loggedUserId)
            setArena(newArena)
            setIsOnArena((prev) => !prev);
        } catch (error) {
            console.error(error)
        }
    }

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
                        {wins !== undefined &&
                            <>
                                <Characteristic>
                                    <CharValue>{wins}</CharValue>
                                    <ValueName>Wins</ValueName>
                                </Characteristic>
                                <Characteristic>
                                    <CharValue>{losses}</CharValue>
                                    <ValueName>Losses</ValueName>
                                </Characteristic>
                            </>}
                    </Characteristics>
                </Description>
                {loggedUserId !== "-1" && <Heart onClick={toggleFavourite} className={isFavourite && "isFavourite"}>
                    {isFavourite ?
                        <FavoriteIcon /> :
                        <FavoriteBorderIcon />}
                </Heart>}
                {loggedUserId !== "-1" && <Arena className={isOnArena && "onArena"}>
                    <StadiumIcon onClick={toggleArena} />{Object.keys(arena).length}/2
                </Arena>}
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
    backdrop-filter: blur(0.625rem);
    z-index: 2;
  `

const ModalContent = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem #44444444;
    background: linear-gradient(135deg, ${({ theme }) => theme.color.cardDark}, ${({ theme }) => theme.color.cardLight}, ${({ theme }) => theme.color.cardDark});
    width: min(90%, 56.25rem);
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
    font-weight: 400;
    margin: 0;
`

const ValueName = styled.p`
    font-size: 0.75rem;
    font-weight: 900;
    margin: 0;
`

const Heart = styled.div`
    position: absolute;
    bottom: 1rem;
    left: 1rem;

    &.isFavourite {
        color: red;
    }
`

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`

const Arena = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: grey;

    &.onArena {
        color: #ff0000;
    }
`

export default PokemonDetailsModal