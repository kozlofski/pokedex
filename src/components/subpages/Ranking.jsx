import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginContext from '../../context/LoginContext'
import PokemonRankingTable from '../shared/PokemonRankingTable'
import styled from 'styled-components'

const Ranking = () => {
    const { loggedUserId } = useContext(LoginContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (loggedUserId === '-1') navigate("/forbidden")
    })

    return (
        <RankingContainer>
            {loggedUserId !== '-1' && <PokemonRankingTable edit={false} />}
        </RankingContainer>)
}

const RankingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    justify-content: center;
`

export default Ranking