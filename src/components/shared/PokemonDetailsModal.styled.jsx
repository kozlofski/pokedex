import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"
import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginContext from '../../context/LoginContext';

const JSON_SERVER_URL = "http://localhost:3000/users"

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

const PokemonDetailsModal = ({ onClose, pokemon }) => {
    const { loggedUserId } = useContext(LoginContext)

    const [isFavourite, setIsFavourite] = useState(false);
    const [oldFavouritesArray, setOldFavouritesArray] = useState([]);

    const { baseExperience,
        height,
        weight,
        ability,
        imgUrl } = useFetchSinglePokemon(pokemon.url)

    const setHeart = async () => {
        try {
            const response = await fetch(`${JSON_SERVER_URL}/${loggedUserId}`)
            if (!response) throw new Error("Problem with fetching favourites")

            const jsonResponse = await response.json();
            setOldFavouritesArray(jsonResponse.favourites);

            if (jsonResponse.favourites.indexOf(pokemon.name) !== -1) setIsFavourite(true)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (loggedUserId !== -1) setHeart();
    }, [])


    const toggleFavourite = async () => {
        const newIsFavourite = !isFavourite;
        console.log("Is favourite was: ", isFavourite)

        try {
            let newFavouritesArray = []

            if (newIsFavourite === true) {
                newFavouritesArray = [...oldFavouritesArray, pokemon.name]
                console.log("Favouring: ", newFavouritesArray)
            } else {
                newFavouritesArray = oldFavouritesArray.filter(
                    (favPokemon) => favPokemon !== pokemon.name
                )
            }

            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favourites: newFavouritesArray
                })
            })
            if (!patchResponse) throw new Error("Error patching favourites list")

            setIsFavourite(newIsFavourite);
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
                    </Characteristics>
                </Description>
                {loggedUserId >= 0 && <Heart onClick={toggleFavourite}>{isFavourite ?
                    <FavoriteIcon /> :
                    <FavoriteBorderIcon />}
                </Heart>}
            </ModalContent>
        </Modal>
    );
}

export default PokemonDetailsModal