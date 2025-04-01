import React from 'react'
import { styled } from "styled-components"

const StyledInput = styled.input`
    border: 2px solid blue;
    border-radius: 0.5rem;
    padding: 0.25rem;
`
const ErrorMessage = styled.p`
    color: red;
    font-sie: 0.75rem;    
    height: 1.5rem;
`

const Input = (props) => {
    const { type, placeholder, error: { message }, ...rest } = props
    // console.log("Input props: ", props)
    return (<>
        <StyledInput type={type} placeholder={placeholder} {...rest}></StyledInput>
        <ErrorMessage>{message}</ErrorMessage>
    </>)
}

export default Input