import React, { useEffect } from 'react'

import { useState, useContext } from 'react'
import { styled } from "styled-components"
import GlobalContext from '../../context/GlobalContext'

const PAGE_LIMIT = 15;

const PaginationContainer = styled.ul`
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 0.5rem;
`
const PageButton = styled.li`
    height: 2em;
    width: 2em;
    padding: 0.25em;
    border: 1px solid blue;
    border-radius: 33%;
    text-align: center;
    color: blue;

    &:active {
        border: 1px solid green;
        }
        
    &.active {
        border: 1px solid red;            
    }

    &:hover {
        cursor: pointer;
    }
`

const Pagination = ({ pokemonsFiltered, setPokemonsPaginated }) => {
    // const { pageLimit, currentPage, setCurrentPage } = useContext(GlobalContext)
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = pokemonsFiltered ? pokemonsFiltered.length / PAGE_LIMIT : 0;

    const numbers = []
    for (let i = 1; i <= totalPages; i++) {
        numbers.push(i)
    }

    const handleChangePage = (number) => {
        const newPage = number
        const paginated = pokemonsFiltered.slice((newPage - 1) * 15, (newPage) * 15);
        setPokemonsPaginated(paginated)
        setCurrentPage(number)
    }

    return (
        <PaginationContainer>
            {numbers.map((number) =>
            (<PageButton
                key={number}
                onClick={() => handleChangePage(number)}
                className={number === currentPage ? "active" : ""}
            >{number}</PageButton>)
            )}
        </PaginationContainer>
    )
}

export default Pagination