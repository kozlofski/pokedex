import React from 'react'
import { styled } from "styled-components"

import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'
import Button from "./Button"

const WinnerModal = ({ onClose, pokemon }) => {
    const { imgUrl } = useFetchSinglePokemon(pokemon)

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
`

const Header = styled.p`
    font-size: 1.75rem;
    font-weight: 900;
    margin: 0;
`

const H2 = styled.h2`
    font-size: 2rem;
`

export default WinnerModal