import React from 'react'
import { styled } from "styled-components"
import useFetchAllPokemons from '../../hooks/useFetchAllPokemons'
import { useState, useEffect, useContext } from 'react'
import LoginContext from '../../context/LoginContext'
const JSON_SERVER_URL = "http://localhost:3000/users"
const BASE_URL = "https://pokeapi.co/api/v2/";

const RankingContainer = styled.div`

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
    &:nth-child(even) {
        background-color: #aaeeff;
        }
        `

const TableHeader = styled.th`
        position: sticky;
        background-color: #ffffffff;
        padding: 1rem 0;
        top: 0;
        `

const HeaderTitle = styled.span`
&.sortBy.asc::after {
    content: "^"
    }
    
    &.sortBy.desc::after {
        content: "v"
        }
        
        `

const TableCell = styled.td`
        padding: 0 1rem;
        text-align: center;
        border: none;
`

const Ranking = () => {
    const { loggedUserId } = useContext(LoginContext)
    const { completePokemons, isPending } = useFetchAllPokemons(BASE_URL, JSON_SERVER_URL, loggedUserId)
    const [sortedPokemons, setSortedPokemons] = useState(completePokemons)
    const [nameSortAsc, setNameSortAsc] = useState(true)
    const [expSortAsc, setExpSortAsc] = useState(true)
    const [weightSortAsc, setWeightSortAsc] = useState(true)
    const [heightSortAsc, setHeightSortAsc] = useState(true)
    const [winsSortAsc, setWinsSortAsc] = useState(true)
    const [lossesSortAsc, setLossesSortAsc] = useState(true)
    const [sortingParam, setSortingParam] = useState("name")

    useEffect(() => sortPokemons(sortName), [completePokemons])

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
        winsSortAsc ? pokemonA.wins - pokemonB.wins : pokemonB.wins - pokemonA.wins

    const sortLosses = (pokemonA, pokemonB) =>
        lossesSortAsc ? pokemonA.losses - pokemonB.losses : pokemonB.losses - pokemonA.losses

    return (
        <RankingContainer>
            <RankingTable>
                <TableHead>
                    <TableRow>
                        <TableHeader> </TableHeader>
                        <TableHeader onClick={handleSortByName} >
                            <HeaderTitle className={`${(sortingParam === "name" && "sortBy")} ${(nameSortAsc ? "asc" : "desc")}`}>name</HeaderTitle>
                        </TableHeader>
                        <TableHeader onClick={handleSortByExp}>
                            <HeaderTitle className={`${(sortingParam === "exp" && "sortBy")} ${(expSortAsc ? "asc" : "desc")}`}>base exp</HeaderTitle></TableHeader>
                        <TableHeader onClick={handleSortByWeight}>
                            <HeaderTitle className={`${(sortingParam === "weight" && "sortBy")} ${(weightSortAsc ? "asc" : "desc")}`}>weight</HeaderTitle>
                        </TableHeader>
                        <TableHeader onClick={handleSortByHeight}>
                            <HeaderTitle className={`${(sortingParam === "height" && "sortBy")} ${(heightSortAsc ? "asc" : "desc")}`}>height</HeaderTitle>
                        </TableHeader>
                        <TableHeader onClick={handleSortByWins}>
                            <HeaderTitle className={`${(sortingParam === "wins" && "sortBy")} ${(winsSortAsc ? "asc" : "desc")}`}>wins</HeaderTitle>
                        </TableHeader>
                        <TableHeader onClick={handleSortByLosses}>
                            <HeaderTitle className={`${(sortingParam === "losses" && "sortBy")} ${(lossesSortAsc ? "asc" : "desc")}`}>losses</HeaderTitle>
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isPending || sortedPokemons.map((pokemon, id) =>
                        <TableRowComponent key={id} pokemon={pokemon} />
                    )}
                </TableBody>

            </RankingTable>
            {isPending && <p>loading ranking...</p>}
        </RankingContainer>
    )
}

const Image = styled.img`
    margin: 0 auto;
    height: 6rem;
`

const TableRowComponent = ({ pokemon }) => {
    const {
        imgUrl,
        name,
        baseExperience,
        weight,
        height,
        wins,
        losses } = pokemon

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
            </>}
        </TableRow>
    )
}

export default Ranking