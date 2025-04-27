import React from 'react'
import { useState, useEffect } from 'react';

import { styled } from "styled-components"

const PAGE_LIMIT = 15;

const PaginationContainer = styled.ul`
    width: 100%;
    padding: 0.75rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    gap: 0.5rem;
    position: sticky;
    top: 0;
    z-index: 1;
    border: none;
    background-color: ${({ theme }) => theme.color.background};

    // border-radius: 1rem;
    
    @media (max-width: 660px) {
        background-color: ${({ theme }) => theme.color.paginationBackground};
        backdrop-filter: blur(10px);
        position: fixed;
        top: inherit;
        bottom: 0;
        overflow-x: scroll;  
        scrollbar-width: none;
        gap: 0.75%;
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
        
    &.current {
        border: 1px solid ${({ theme }) => theme.color.paginationButton};            
    }

    @media (max-width: 660px) {
        height: 3rem;
        width: 3rem;
        font-size: 1.5rem;
    }

    &.blank {
        border: none;    
    }
`

// const PageSpace = styled.li`
//     height: 2em;
//     width: 2em;
// `

const Pagination = ({ rawPokemonsFiltered, setRawPokemonsPaginated }) => {
    const totalPages = rawPokemonsFiltered ? 1 + (rawPokemonsFiltered.length - 1) / PAGE_LIMIT : 0;
    const [currentPage, setCurrentPage] = useState(1)
    const [numbers, setNumbers] = useState([])

    useEffect(() => {
        const paginated = rawPokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setRawPokemonsPaginated(paginated)
    }, [currentPage, rawPokemonsFiltered, setRawPokemonsPaginated])

    useEffect(() => setCurrentPage(1), [rawPokemonsFiltered])

    useEffect(() => {
        const numbersVar = [];
        if (totalPages >= 2 && totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++)
                numbersVar.push(i)
            setNumbers(numbersVar)
        }
        else if (totalPages > 10) {
            numbersVar.push(1)
            if (currentPage > 3) {
                numbersVar.push(-1)
            }

            if (currentPage > 2)
                numbersVar.push(currentPage - 1)
            if (currentPage > 1 && currentPage < Math.floor(totalPages))
                numbersVar.push(currentPage)
            if (currentPage < Math.floor(totalPages) - 1)
                numbersVar.push(currentPage + 1)

            if (currentPage < Math.floor(totalPages) - 2)
                numbersVar.push(-2)

            // currentPage > 1 && numbersVar.push(currentPage - 1)
            // numbersVar.push(currentPage);
            // currentPage < totalPages && numbersVar.push(currentPage + 1)

            numbersVar.push(Math.floor(totalPages));
            setNumbers(numbersVar)
        }
    }, [currentPage, totalPages])

    const handleChangePage = (number) => {
        setCurrentPage(number)
    } // necessary? inline?

    return (
        <>
            {totalPages >= 2 && <PaginationContainer>
                {numbers.map((number) =>
                    number > 0 ?
                        <PageButton
                            key={number}
                            onClick={() => handleChangePage(number)}
                            className={number === currentPage ? "current" : ""}
                        >{number}</PageButton> :
                        <PageButton className="blank">...</PageButton>
                )
                }
            </PaginationContainer>}
        </>
    )
}

export default Pagination