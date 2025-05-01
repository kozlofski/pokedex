import React from 'react'
import { styled } from "styled-components"
import FlashOnIcon from '@mui/icons-material/FlashOn';

const FightButton = ({ children, disabled, onClick }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {children}
            <FlashOnIcon sx={{ fontSize: "2rem" }} />
        </StyledButton>
    )
}

const StyledButton = styled.button`
    padding: 0.25rem 1rem;
    width: 200px;
    height: 200px;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 0.9rem ${({ theme }) => theme.color.cardShadow};
    background-color: ${({ theme }) => theme.color.fightButton};
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:disabled {
        background-color: ${({ theme }) => theme.color.fightButtonInactive};
        color: ${({ theme }) => theme.color.fightButtonInactiveFont};
    }

    &:active:not(&:disabled) {
        box-shadow: 0.25rem 0.25rem 0.5rem ${({ theme }) => theme.color.cardShadow};
        transform: translate(0.1rem, 0.1rem);
    }

    @media (max-width: 768px) {
        order: 2;
        min-width: 300px;
        flex-grow: 1;
    }
`

export default FightButton