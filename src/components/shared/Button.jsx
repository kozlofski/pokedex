import React from 'react'
import { styled } from "styled-components"

const Button = ({ children, onClick, width = "6.25rem" }) => {
    return (
        <StyledButton onClick={onClick} width={width}>{children}</StyledButton>
    )
}

const StyledButton = styled.button`
    padding: 0.33rem 1rem;
    width: ${(props) => props.width};
    border: none;
    border-radius: 0.25rem;
    background-color: #00aaff;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 660px) {
        width: 100%;
        min-height: 4rem;
    }
`

export default Button