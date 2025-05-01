import React from 'react'
import { useEffect } from 'react';
import { styled } from "styled-components"

import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'
import Button from "./Button"

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
    width: 20rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
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

const Close = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`

const H2 = styled.h2`
    font-size: 2rem;
`


const WinnerModal = ({ onClose, pokemon }) => {
    // const { loggedUserId } = useContext(LoginContext)
    const { imgUrl } = useFetchSinglePokemon(pokemon)

    useEffect(() => {
        // console.log("Setting heart and arena icons after initial render. User: ", loggedUserId)
        // if (loggedUserId !== -1) setHeartAndArenaIcons();
    }, [])

    return (
        <Modal onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <H2>WINNER!</H2>
                <Image src={imgUrl} alt="" />
                <Description>
                    <Header>{pokemon.name}</Header>

                </Description>

                <Button onClick={onClose}>Opuść arenę</Button>
            </ModalContent>
        </Modal>
    );
}

export default WinnerModal