import React from 'react'
import { styled } from "styled-components"

const RankingContainer = styled.div`

`

const RankingTable = styled.table`

`

const TableRow = styled.tr`

`

const TableHeader = styled.th`

`

const Ranking = () => {
    return (
        <RankingContainer>
            <RankingTable>
                <TableRow>
                    <TableHeader>picture</TableHeader>
                    <TableHeader>name</TableHeader>
                    <TableHeader>base exp</TableHeader>
                    <TableHeader>weight</TableHeader>
                    <TableHeader>height</TableHeader>
                    <TableHeader>wins</TableHeader>
                    <TableHeader>losses</TableHeader>
                </TableRow>

            </RankingTable>
        </RankingContainer>
    )
}

export default Ranking