import React from 'react'
import styled from "styled-components"

const NotFound = () => {
    return (
        <NotFoundH2>404 page not found</NotFoundH2>
    )
}

const NotFoundH2 = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 3rem;
    gap: 2rem;
    color: ${({ theme }) => theme.color.fontOnBackground};
`

export default NotFound