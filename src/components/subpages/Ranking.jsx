import React from 'react'

import PokemonRankingTable from '../shared/PokemonRankingTable'
import styled from 'styled-components'

const Ranking = () => {
    return (
        <RankingContainer>
            <PokemonRankingTable edit={false} />
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