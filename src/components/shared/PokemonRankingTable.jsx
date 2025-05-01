import React from 'react'
import { styled } from "styled-components"
import { useState } from 'react'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import useFetchAllPokemons from '../../hooks/useFetchAllPokemons'
import Loader from './Loader'

const PokemonRankingTable = ({ edit, setEditedPokemon }) => {
    const [sortedPokemons, setSortedPokemons] = useState([])
    const { completePokemons, isPending } = useFetchAllPokemons(setSortedPokemons)

    // these states hold sorting direction that will be
    // applied on next handleSort function
    const [nameSortAsc, setNameSortAsc] = useState(true)
    const [expSortAsc, setExpSortAsc] = useState(true)
    const [weightSortAsc, setWeightSortAsc] = useState(true)
    const [heightSortAsc, setHeightSortAsc] = useState(true)
    const [winsSortAsc, setWinsSortAsc] = useState(true)
    const [lossesSortAsc, setLossesSortAsc] = useState(true)
    const [sortingParam, setSortingParam] = useState()

    const sortPokemons = (sortingFn) => {
        const sorted = completePokemons.toSorted(sortingFn)
        setSortedPokemons(sorted)
    }

    const handleSortByName = () => {
        setSortingParam("name")
        sortPokemons(sortName)
        setNameSortAsc(prev => !prev)
    }

    const handleSortByExp = () => {
        setExpSortAsc(prev => !prev)
        setSortingParam("exp")
        sortPokemons(sortExp)
    }

    const handleSortByWeight = () => {
        setWeightSortAsc(prev => !prev)
        setSortingParam("weight")
        sortPokemons(sortWeight)
    }

    const handleSortByHeight = () => {
        setHeightSortAsc(prev => !prev)
        setSortingParam("height")
        sortPokemons(sortHeight)
    }

    const handleSortByWins = () => {
        setWinsSortAsc(prev => !prev)
        setSortingParam("wins")
        sortPokemons(sortWins)
    }

    const handleSortByLosses = () => {
        setLossesSortAsc(prev => !prev)
        setSortingParam("losses")
        sortPokemons(sortLosses)
    }

    const sortName = (pokemonA, pokemonB) =>
        nameSortAsc ? pokemonA.name.localeCompare(pokemonB.name) : pokemonB.name.localeCompare(pokemonA.name)

    const sortExp = (pokemonA, pokemonB) =>
        expSortAsc ? pokemonA.baseExperience - pokemonB.baseExperience : pokemonB.baseExperience - pokemonA.baseExperience

    const sortWeight = (pokemonA, pokemonB) =>
        weightSortAsc ? pokemonA.weight - pokemonB.weight : pokemonB.weight - pokemonA.weight

    const sortHeight = (pokemonA, pokemonB) =>
        heightSortAsc ? pokemonA.height - pokemonB.height : pokemonB.height - pokemonA.height

    const sortWins = (pokemonA, pokemonB) =>
        winsSortAsc ? (pokemonA.wins ?? -1) - (pokemonB.wins ?? -1) : (pokemonB.wins ?? -1) - (pokemonA.wins ?? -1)

    const sortLosses = (pokemonA, pokemonB) =>
        lossesSortAsc ? (pokemonA.losses ?? -1) - (pokemonB.losses ?? -1) : (pokemonB.losses ?? -1) - (pokemonA.losses ?? -1)

    return (
        <RankingContainer className="ranking-container">
            {isPending ? <Loader /> :
                <RankingTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader> </TableHeader>
                            <TableHeader onClick={handleSortByName} >
                                <HeaderTitle>name
                                    {sortingParam === "name" &&
                                        <SortingDirArrow>
                                            {!nameSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            <TableHeader onClick={handleSortByExp} >
                                <HeaderTitle>base exp
                                    {sortingParam === "exp" &&
                                        <SortingDirArrow>
                                            {!expSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            <TableHeader onClick={handleSortByWeight}>
                                <HeaderTitle>weight
                                    {sortingParam === "weight" &&
                                        <SortingDirArrow>
                                            {!weightSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            <TableHeader onClick={handleSortByHeight}>
                                <HeaderTitle>height
                                    {sortingParam === "height" &&
                                        <SortingDirArrow>
                                            {!heightSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            <TableHeader onClick={handleSortByWins}>
                                <HeaderTitle>wins
                                    {sortingParam === "wins" &&
                                        <SortingDirArrow>
                                            {!winsSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            <TableHeader onClick={handleSortByLosses}>
                                <HeaderTitle >losses
                                    {sortingParam === "losses" &&
                                        <SortingDirArrow>
                                            {!lossesSortAsc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                        </SortingDirArrow>
                                    }
                                </HeaderTitle>
                            </TableHeader>
                            {edit && <TableHeader> </TableHeader>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isPending || sortedPokemons.map((pokemon, id) =>
                            <TableRowComponent key={id} pokemon={pokemon} edit={edit} setEditedPokemon={setEditedPokemon} />
                        )}
                    </TableBody>

                </RankingTable>}
        </RankingContainer>
    )
}

const Image = styled.img`
    margin: 0 auto;
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    min-width: 2rem;
`

const TableRowComponent = ({ pokemon, edit, setEditedPokemon }) => {
    const {
        imgUrl,
        name,
        baseExperience,
        weight,
        height,
        wins,
        losses } = pokemon

    const handleEdit = () => {
        setEditedPokemon(pokemon)
    }

    return (
        <TableRow>
            {height && <>
                <TableCell><Image src={imgUrl} /></TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{baseExperience}</TableCell>
                <TableCell>{weight}</TableCell>
                <TableCell>{height}</TableCell>
                <TableCell>{wins}</TableCell>
                <TableCell>{losses}</TableCell>
                {edit && <TableCell onClick={handleEdit} className="editButton" >Edytuj</TableCell>}
            </>}
        </TableRow>
    )
}

const RankingContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    min-height: 100%;
    justify-content: center;
`
const RankingTable = styled.table`
    width: 100%;
`

const TableHead = styled.thead`
`
const TableBody = styled.tbody`
    width: 100%;
`

const TableRow = styled.tr`
    &:nth-child(odd) {
        color: ${({ theme }) => theme.color.fontOnBackground};        
    }

    &:nth-child(even) {
        background-color: ${({ theme }) => theme.color.tableSecondaryColor};        
        color: ${({ theme }) => theme.color.tableSecondaryFontColor};        
    }
`

const TableHeader = styled.th`
    position: sticky;
    background-color: ${({ theme }) => theme.color.background};
    padding: 2rem 0;
    top: 0;
  
    @media (max-width: 660px) {
        writing-mode: vertical-lr;
        text-orientation: mixed;
        padding: 1rem 0 0 0;
        min-height: 120px;
        top: 2rem;
    }
`

const HeaderTitle = styled.span`
    &:hover {
        cursor: pointer;
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 660px) {
        writing-mode: vertical-lr;
        text-orientation: mixed;
    }
`

const TableCell = styled.td`
        text-align: center;
        border: none;
        min-width: fit-content;

        &.editButton:hover {
            cursor: pointer;
        }
`

export default PokemonRankingTable