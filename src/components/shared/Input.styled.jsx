import React from 'react'
import { styled } from "styled-components"

const StyledInput = styled.input`
    border: 2px solid blue;
    border-radius: 0.5rem;
    padding: 0.25rem;
`

const Input = (props) => {
    const { type, placeholder, ...rest } = props
    // console.log(rest)
    return (
        <StyledInput type={type} placeholder={placeholder} {...rest}></StyledInput>
    )
}

export default Input