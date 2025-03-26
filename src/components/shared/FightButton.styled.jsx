import React from 'react'
import { styled } from "styled-components"
import FlashOnIcon from '@mui/icons-material/FlashOn';

const StyledButton = styled.button`
    padding: 0.25rem 1rem;
    width: 7rem;
    height: 7rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #ff3300;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:disabled {
        background-color: #aaaaaa;
        color: #cccccc;
    }
`

const FightButton = ({ children, disabled, onClick }) => {
    console.log("Fight button disabled? ", disabled)
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {children}
            <FlashOnIcon sx={{ fontSize: "2rem" }} />
        </StyledButton>
    )
}

export default FightButton