import React from 'react'
import styled from "styled-components"

const Forbidden = () => {
    return (
        <ForbiddenH2>403 forbidden</ForbiddenH2>
    )
}

const ForbiddenH2 = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    font-size: 3rem;
    gap: 2rem;
    color: ${({ theme }) => theme.color.fontOnBackground};
`

export default Forbidden