import React from 'react'
import { styled } from "styled-components"

const Input = (props) => {
    const { type, placeholder, error: { message }, ...rest } = props
    return (<>
        <StyledInput type={type} placeholder={placeholder} {...rest}></StyledInput>
        <ErrorMessage>{message}</ErrorMessage>
    </>)
}

const StyledInput = styled.input`
    border: 2px solid ${({ theme }) => theme.color.inputBorder};
    color: ${({ theme }) => theme.color.fontOnBackground};
    background: ${({ theme }) => theme.color.background};
    border-radius: 0.5rem;
    padding: 0.25rem;

    @media (max-width: 660px) {
        width: 75%;
        padding: 0.33rem;
    }
`
const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.color.errorMessage};
    font-sie: 0.75rem;    
    height: 1.5rem;
`

export default Input