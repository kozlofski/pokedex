import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"
import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StadiumIcon from '@mui/icons-material/Stadium';
import CloseIcon from '@mui/icons-material/Close';
import LoginContext from '../../context/LoginContext';
import { JSON_SERVER_URL } from '../../constants';

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
    bottom: 1rem;
    left: 1rem;
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
        color: red;
    }
`

const PokemonDetailsModal = ({ onClose, pokemon }) => {
    const { loggedUserId } = useContext(LoginContext)

    const [isFavourite, setIsFavourite] = useState(false);
    const [oldFavourites, setOldFavourites] = useState({});
    const [isOnArena, setIsOnArena] = useState(false)
    const [arena, setArena] = useState({})


    const { baseExperience,
        height,
        weight,
        ability,
        imgUrl,
        wins,
        losses } = useFetchSinglePokemon(pokemon)

    const setHeartAndArenaIcons = async () => {
        try {
            const response = await fetch(`${JSON_SERVER_URL}/${loggedUserId}`)
            if (!response) throw new Error("Problem with fetching favourites")

            const jsonResponse = await response.json();
            setOldFavourites(jsonResponse.favourites);
            setArena(jsonResponse.arena)

            if (pokemon.name in jsonResponse.favourites) setIsFavourite(true)
            if (pokemon.name === jsonResponse.arena.leftPokemon?.name || pokemon.name === jsonResponse.arena.rightPokemon?.name) {
                console.log(`${pokemon.name} matches ${jsonResponse.arena.leftPokemon?.name} or ${jsonResponse.arena.rightPokemon?.name}`)
                setIsOnArena(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (loggedUserId !== -1) setHeartAndArenaIcons();
    }, [])


    const toggleFavourite = async () => {
        const newIsFavourite = !isFavourite;
        console.log("Is favourite was: ", isFavourite)

        try {
            let newFavourites = {}

            if (newIsFavourite === true) {
                newFavourites = oldFavourites
                newFavourites[pokemon.name] = true
            } else {
                // spread syntax?
                newFavourites = oldFavourites
                delete newFavourites[pokemon.name]
            }

            // fetch should be before if
            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favourites: newFavourites
                })
            })
            if (!patchResponse) throw new Error("Error patching favourites list")

            setIsFavourite(newIsFavourite);
        } catch (error) {
            console.log(error)
        }
    }

    const toggleArena = async () => {
        const newIsOnArena = !isOnArena;

        try {
            let newArena = {}

            if (newIsOnArena === true) {
                const pokemonsInArena = Object.keys(arena).length;
                const pokemonToArena = { name, baseExperience, weight, imgUrl }
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
                // spread syntax?
                newArena = arena
                if (pokemon.name === newArena["leftPokemon"].name) delete newArena["leftPokemon"]
                else delete newArena["rightPokemon"]
            }

            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    arena: newArena
                })
            })
            if (!patchResponse) throw new Error("Error patching arena")

            setArena(newArena)
            setIsOnArena(newIsOnArena);
        } catch (error) {
            console.log(error)
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
                {loggedUserId !== "-1" && <Heart onClick={toggleFavourite}>{isFavourite ?
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

export default PokemonDetailsModal