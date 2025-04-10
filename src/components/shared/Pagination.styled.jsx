import React from 'react'
import { useState, useEffect } from 'react';

import { styled } from "styled-components"

const PAGE_LIMIT = 15;

const PaginationContainer = styled.ul`
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    gap: 0.5rem;
    position: sticky;
    top: 0;
    z-index: 1;
    backdrop-filter: blur(10px);
    // background-color: ${({ theme }) => theme.color.paginationBackground};
    border: none;
    border-radius: 1rem;

    @media (max-width: 660px) {
        position: fixed;
        top: inherit;
        bottom: 0;
    }
`
const PageButton = styled.li`
    height: 2em;
    width: 2em;
    padding: 0.25em;
    border: 1px solid ${({ theme }) => theme.color.fontOnBackground};
    border-radius: 33%;
    text-align: center;
    color: ${({ theme }) => theme.color.fontOnBackground};

    &:active {
        border: 1px solid green;
        }
        
    &.active {
        border: 1px solid red;            
    }

    &:hover {
        cursor: pointer;
        border: 1px solid green;
    }
`

const Pagination = ({ rawPokemonsFiltered, setRawPokemonsPaginated }) => {
    const totalPages = rawPokemonsFiltered ? 1 + (rawPokemonsFiltered.length - 1) / PAGE_LIMIT : 0;
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const paginated = rawPokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setRawPokemonsPaginated(paginated)
    }, [currentPage, rawPokemonsFiltered, setRawPokemonsPaginated])

    useEffect(() => setCurrentPage(1), [rawPokemonsFiltered])

    const numbers = []
    if (totalPages >= 2)
        for (let i = 1; i <= totalPages; i++)
            numbers.push(i)


    const handleChangePage = (number) => setCurrentPage(number) // necessary? inline?

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