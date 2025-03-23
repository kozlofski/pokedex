import React from 'react'
import { styled } from "styled-components"

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
    padding: 20px;
    background - color: white;
    border - radius: 8px;
    `

const PokemonDetailsModal = ({ onClose }) => {

    return (
        <Modal onClick={onClose}>
            <ModalContent>
                POKEMON DETAILS
                <button onClick={onClose}>Zamknij</button>
            </ModalContent>
        </Modal>
    );
}

export default PokemonDetailsModal