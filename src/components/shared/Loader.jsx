import React from 'react'
import { styled } from "styled-components"
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderHeader>loading...</LoaderHeader>
            <HourglassTopIcon fontSize='inherit' />
        </LoaderContainer>
    )
}

const LoaderContainer = styled.div`
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
const LoaderHeader = styled.h2`
    
`

export default Loader