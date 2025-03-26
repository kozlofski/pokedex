import React from 'react'
import { styled } from "styled-components"

const StyledButton = styled.button`
    padding: 0.25rem 1rem;
    width: 7rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #00aaff;
    color: white;
`

const Button = ({ children, onClick }) => {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    )
}

export default Button