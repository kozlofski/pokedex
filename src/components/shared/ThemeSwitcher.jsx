import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import GlobalContext from '../../context/GlobalContext'
import { light, dark } from '../../styles/theme'

const ThemeSwitcher = () => {
    const { setSelectedTheme } = useContext(GlobalContext)

    return (
        <SwitcherContainer>
            <ThemeButton className="light" onClick={() => setSelectedTheme(light)}></ThemeButton>
            <ThemeButton className="dark" onClick={() => setSelectedTheme(dark)}></ThemeButton>
        </SwitcherContainer>
    )
}

const SwitcherContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`

const ThemeButton = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 50%;

    &.light {
        background-color: ${light.color.background}; 
        border: 1px solid ${light.color.button};
    }

    &.dark {
        background-color: ${dark.color.background}; 
        border: 1px solid ${dark.color.button};
    }

    @media (max-width: 660px) {
        width: 30px;
        height: 30px;
    }
`

export default ThemeSwitcher