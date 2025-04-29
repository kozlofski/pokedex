import React from 'react'
import { styled } from "styled-components"

const StyledButton = styled.button`
    padding: 0.25rem 1rem;

    width: ${(props) => props.width};

    border: none;
    border-radius: 0.25rem;
    background-color: #00aaff;
    color: white;

    @media (max-width: 660px) {
        width: 100%;
        min-height: 4rem;
    }
`

const Button = ({ children, onClick, width = "6rem" }) => {
    return (
        <StyledButton onClick={onClick} width={width}>{children}</StyledButton>
    )
}

export default Button