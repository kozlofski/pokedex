import React from 'react'
import { styled } from "styled-components"
// import useFetchPokemons from '../../hooks/useFetchPokemons'
import useFetchSinglePokemon from '../../hooks/useFetchSinglePokemon'
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
`

const TableHeader = styled.th`
`
const TableCell = styled.td`
padding: 0 1rem;
text-align: center;
border-bottom: 1px solid blue;
`

const Ranking = () => {
    const { loggedUserId } = useContext(LoginContext)
    // const { pokemons, isPending } = useFetchPokemons(JSON_SERVER_URL, loggedUserId);
    const { completePokemons, isPending } = useFetchAllPokemons(BASE_URL, JSON_SERVER_URL, loggedUserId)
    // const [completePokemons, setCompletePokemons] = useState([])
    // console.log("Pokemons in ranking: ", pokemons)
    const [sortedPokemons, setSortedPokemons] = useState(completePokemons)

    // useEffect(() => setSortedPokemons(pokemons), [pokemons])
    // useEffect(() => sortPokemons(), [completePokemons])

    // const sortPokemons = () => {
    //     const sorted = completePokemons.toSorted((pokemonA, pokemonB) => pokemonA.baseExperience - pokemonB.baseExperience)
    //     setSortedPokemons(sorted)
    // }

    return (
        <RankingContainer>
            <RankingTable>
                <TableHead>
                    <TableRow>
                        <TableHeader></TableHeader>
                        <TableHeader>name</TableHeader>
                        <TableHeader>base exp</TableHeader>
                        <TableHeader>weight</TableHeader>
                        <TableHeader>height</TableHeader>
                        <TableHeader>wins</TableHeader>
                        <TableHeader>losses</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completePokemons.map((pokemon, id) =>
                        <TableRowComponent key={id} pokemon={pokemon} />
                    )}
                </TableBody>

            </RankingTable>
        </RankingContainer>
    )
}


const Image = styled.img`
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