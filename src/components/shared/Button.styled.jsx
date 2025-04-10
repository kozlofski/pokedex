import React from 'react'
import { styled } from "styled-components"

const StyledButton = styled.button`
    padding: 0.25rem 1rem;
    width: 7rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #00aaff;
    color: white;

    
    @media (max-width: 660px) {
        width: 100%;
        height: 4rem;
    }
`

const Button = ({ children, onClick }) => {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    )
}

export default Button