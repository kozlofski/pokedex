import React from 'react'
import { styled } from "styled-components"



const Button = ({ children, onClick, width = "6rem" }) => {
    const StyledButton = styled.button`
    padding: 0.25rem 1rem;

    width: ${width};

    border: none;
    border-radius: 0.25rem;
    background-color: #00aaff;
    color: white;
    flex-shrink: 1;

    
    @media (max-width: 660px) {
        width: 100%;
        height: 4rem;
    }
`
    return (
        <StyledButton onClick={onClick} width={width}>{children}</StyledButton>
    )
}

export default Button