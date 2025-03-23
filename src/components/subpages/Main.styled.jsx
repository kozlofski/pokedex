import React from 'react'

import { styled } from "styled-components"

const MainContainer = styled.div`
    height: 100%;
`

const Main = ({ children }) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main