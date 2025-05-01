import React from 'react'
import { styled } from "styled-components"

const Main = ({ children }) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

const MainContainer = styled.main`
    max-width: 1280px; 
    width: 100%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    @media (max-width: 660px) {
        // padding-top: 1rem;
    }
`

export default Main