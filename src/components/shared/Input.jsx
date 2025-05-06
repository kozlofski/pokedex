import React from 'react'
import { styled } from "styled-components"

const Input = (props) => {
    const { type, placeholder, label, error: { message }, ...rest } = props
    return (<InputContainer>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput type={type} placeholder={placeholder} {...rest}></StyledInput>
        <ErrorMessage>{message}</ErrorMessage>
    </InputContainer>)
}

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
`

const StyledLabel = styled.label`
// align-self: start;
    color: ${({ theme }) => theme.color.fontOnBackground};
`

const StyledInput = styled.input`
    border: 2px solid ${({ theme }) => theme.color.inputBorder};
    color: ${({ theme }) => theme.color.fontOnBackground};
    background: ${({ theme }) => theme.color.background};
    border-radius: 0.5rem;
    padding: 0.25rem;

    @media (max-width: 660px) {
        width: 85%;
        padding: 0.5rem;
    }
`
const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.color.errorMessage};
    font-size: 0.8em;    
    height: 1.5rem;
`

export default Input