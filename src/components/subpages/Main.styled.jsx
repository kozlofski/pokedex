import React, { useContext } from 'react'

import { styled } from "styled-components"
import LoginContext from '../../context/LoginContext'

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