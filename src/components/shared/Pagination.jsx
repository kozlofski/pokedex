import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from "styled-components"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PAGE_LIMIT } from '../../constants';

const Pagination = ({ rawPokemonsFiltered, setRawPokemonsPaginated }) => {
    const totalPages = rawPokemonsFiltered ? Math.ceil(rawPokemonsFiltered.length / PAGE_LIMIT) : 0;
    const [currentPage, setCurrentPage] = useState(1)
    const [numbers, setNumbers] = useState([])
    const [buttonsLimit, setButtonsLimit] = useState(12)

    useEffect(() => {
        const paginated = rawPokemonsFiltered.slice((currentPage - 1) * PAGE_LIMIT, (currentPage) * PAGE_LIMIT);
        setRawPokemonsPaginated(paginated)
    }, [currentPage, rawPokemonsFiltered, setRawPokemonsPaginated])

    useEffect(() => setCurrentPage(1), [rawPokemonsFiltered])

    useEffect(() => {
        const setButtonsLimitDependingOnViewportSize = () => {
            const { innerWidth } = window;
            setButtonsLimit(innerWidth > 660 ? 12 : 6);
        }

        setButtonsLimitDependingOnViewportSize();

        window.addEventListener('resize', setButtonsLimitDependingOnViewportSize)
        return () => window.removeEventListener('resize', setButtonsLimitDependingOnViewportSize)
    }, [])


    useEffect(() => {
        const numbersVar = [];
        if (totalPages >= 2 && totalPages <= buttonsLimit) {
            for (let i = 1; i <= totalPages; i++)
                numbersVar.push(i)
            setNumbers(numbersVar)
        }
        else if (totalPages > buttonsLimit) {
            numbersVar.push(1)
            if (currentPage > 3) {
                numbersVar.push(-1)
            }

            if (currentPage > 2)
                numbersVar.push(currentPage - 1)
            if (currentPage > 1 && currentPage < totalPages)
                numbersVar.push(currentPage)
            if (currentPage < totalPages - 1)
                numbersVar.push(currentPage + 1)

            if (currentPage < totalPages - 2)
                numbersVar.push(-2)

            // currentPage > 1 && numbersVar.push(currentPage - 1)
            // numbersVar.push(currentPage);
            // currentPage < totalPages && numbersVar.push(currentPage + 1)

            numbersVar.push(totalPages);
            setNumbers(numbersVar)
        }

    }, [currentPage, totalPages, buttonsLimit])

    return (
        <>
            {totalPages >= 2 &&
                <PaginationContainer>
                    <PageButton key="-3" onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}><ArrowBackIcon /></PageButton>
                    {numbers.map((number) =>
                        number > 0 ?
                            <PageButton
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={number === currentPage ? "current" : ""}
                            >{number}</PageButton> :
                            <PageButton key={number} className="blank">...</PageButton>
                    )
                    }
                    <PageButton key="-4" onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)}><ArrowForwardIcon /></PageButton>

                </PaginationContainer>}
        </>
    )
}

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
    display: flex;
    align-items: center;
    justify-content: center;
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

export default Pagination