import React from 'react'

import { styled } from "styled-components"

const MainContainer = styled.div`
    height: 100%;

    @media (max-width: 660px) {
        padding-top: 1rem;
    }
`

const Main = ({ children }) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main