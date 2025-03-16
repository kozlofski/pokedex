import React, { useEffect } from 'react'

import { useState, useContext } from 'react'
import { styled } from "styled-components"
import { GlobalContext } from '../../context/GlobalContext'

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
        border: 1px solid red;
    }
`

const Pagination = () => {
    const { pageLimit, currentPage, setCurrentPage } = useContext(GlobalContext)

    const numbers = []
    for (let i = 1; i <= 10; i++) {
        numbers.push(i)
    }

    return (
        <PaginationContainer>
            {numbers.map((number) =>
            (<PageButton
                key={number}
                onClick={() => setCurrentPage(number)}
            >{number}</PageButton>)
            )}
        </PaginationContainer>
    )
}

export default Pagination